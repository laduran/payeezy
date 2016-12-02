import {Express, Application, Router} from 'express';
import {payeezyClientService} from '../services/payeezy-client-service';

export default function (router:Router) {
	router
		.get('/getToken', payeezyClientService.getToken)
		.post('/authorizeToken', payeezyClientService.authorizeToken)
		.post('/purchase', payeezyClientService.purchase)
		.post('/refund', payeezyClientService.refund)
		.post('/void', payeezyClientService.voidTransaction)
		
}