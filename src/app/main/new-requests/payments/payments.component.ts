import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {APIService} from '../../../service/api-service';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../../service/auth.service';

declare var paypal;

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
    @ViewChild('paypal', {static: true}) paypalElement: ElementRef;
    @Input() requestForm;
    @Output() createAlert = new EventEmitter<any>();
    @Output() submitForm = new EventEmitter<string>();

    product = {
        price: 1.50,
        description: 'Course Watch Request',
    };

    paidFor = false;
    processingPayment = false;

    constructor(private apiService: APIService, private authService: AuthService) {
    }


    ngOnInit() {
        paypal
            .Buttons({
                style: {
                    size: 'small',
                    layout: 'vertical',
                    color: 'gold',
                    shape: 'pill',
                    label: 'paypal'
                },
                funding: {
                    allowed: [ paypal.FUNDING.CREDIT, paypal.FUNDING.VENMO, paypal.FUNDING.CARD ]
                },
                createOrder: (data, actions) => {
                    this.processingPayment = true;
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: this.product.description,
                                amount: {
                                    currency_code: 'USD',
                                    value: this.product.price
                                }
                            }
                        ],
                        application_context: {
                            shipping_preference: 'NO_SHIPPING'
                        }
                    });
                },
                onApprove: async (data, actions) => {
                    if (this.requestForm.invalid) {
                        this.requestForm.markAsDirty();
                    } else {
                        const requestData = {};
                        requestData['order'] = data;
                        requestData['course_request'] = this.requestForm.getRawValue();
                        requestData['user'] = {
                            'account_email': this.authService.userDetails.email,
                            'uid': this.authService.userDetails.uid
                        };
                        const serializedForm = JSON.stringify(requestData);

                        this.apiService.make_new_request(serializedForm).subscribe(
                            async response => {
                                console.log(response);
                                const order = await actions.order.capture();            // finalize and collect payment
                                this.paidFor = true;
                                this.processingPayment = false;
                                this.sendAlert('Request Successfully Added', 'success');
                            },
                            (err: HttpErrorResponse) => {
                                console.error(err);
                                this.processingPayment = false;
                                this.paidFor = false;
                                this.sendAlert(err.error['message'] + ' - No payment collected', 'danger');
                            }
                        );
                    }
                },
                onError: err => {
                    console.log(err);
                }
            })
            .render(this.paypalElement.nativeElement);
    }

    sendAlert(message, type) {
        this.createAlert.emit({message: message, type: type});
    }
}
