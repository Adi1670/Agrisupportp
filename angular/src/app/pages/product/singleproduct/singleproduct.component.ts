import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import Razorpay from 'razorpay';
import { AuthService } from 'src/app/providers/services/auth.service';
import { ProductService } from 'src/app/providers/services/product.service';

declare var Razorpay: any; 

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.css']
})
export class SingleproductComponent implements OnInit {

  id:any
  product: any
  isLoaded: boolean = false
  errMsg: String = ""
  imgUrl: string = "http://localhost:3000/"

  constructor(private _activatedRoute:ActivatedRoute, private _data:ProductService, public _auth:AuthService) { }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params["id"] //req.params.id
    this.getSingle(this.id)
  }

  getSingle(id:any){
    this._data.getSingleProduct(id).subscribe(
      result => {
        // console.log(result.data)
        this.product = result.data
      },
      e => {
        this.errMsg = e.message
        this.isLoaded = true
      },
      () => { // finish
        this.isLoaded = true
      }
    )
  }
   handlePayment =  () => {

  this._data.createorder(100).subscribe(data=>{
      if(!data.success){
        console.log('error creating payment');
      }else{
        const { orderID, currency, amount: orderAmount, keyID } = data.data;
        if (!keyID) {
          console.error('No key received from the backend!');
          return;
        }
        const options = {
          key:keyID,
          amount: orderAmount,
          currency: currency,
          name: 'Agri',
          description: 'Agri Test Transaction',
          order_id: orderID,
          handler: (response: any) => {
            console.log('Payment Completed!', response);
            // Handle successful payment response
          },
          modal: {
            ondismiss: () => {
              console.log('Payment Canceled');
              // Handle payment cancellation
            }
          },
          prefill: {
            name: 'Albert',
            email: 'albert@gmail.com',
            contact: '9315240415'
          },
          notes: {
            address: 'Albert house'
          },
          theme: {
            color: 'blue'
          }
        };
     // Initialize Razorpay and open the checkout
     const rzp1: any = new Razorpay(options);
     rzp1.on('payment.failed', (response: any) => {
       console.log('Payment Failed', response);
       // Handle failed payment response
     });
     rzp1.open();
      }
    });
};

}
