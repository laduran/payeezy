import {Request, Response} from 'express';
import {payeezyService} from '../../lib/payeezy-service';

class PayeezyClientService{
 
 constructor(){		
 }
	public getToken(req, res: Response){
		payeezyService.performTestAuthorizeTransaction(req).then((token) => {			
			res.status(200).send(token)
		});
	}
	public authorizeToken(req: Request, res: Response) {		
		payeezyService.performAuthorizeTransaction(req.body).then((token) => {			
			res.status(200).send(token)
		}, (err) => res.status(500).send(err));
	}
	public purchase(req: Request, res: Response) {		
		payeezyService.performPurchaseTransaction(req.body).then((token) => {			
			res.status(200).send(token)
		}, (err) => res.status(500).send(err));
	}
	public refund(req: Request, res: Response) {		
		payeezyService.performRefundTransaction(req.body).then((token) => {			
			res.status(200).send(token)
		}, (err) => res.status(500).send(err));
	}
	public voidTransaction(req: Request, res: Response) {		
		payeezyService.performVoidTransaction(req.body).then((token) => {			
			res.status(200).send(token)
		}, (err) => res.status(500).send(err));
	}
}


let payeezyClientService = new PayeezyClientService();  

export {payeezyClientService, PayeezyClientService };