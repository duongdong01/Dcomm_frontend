const paypal = require('paypal-rest-sdk')

paypal.configure({
  mode: 'sandbox', // or 'live'
  client_id: 'AX8YMIKcGVmb5-awx8fmR3_V1fDLz19zMVgWBr2jbpRYrsYBfqreC9TaXNwQW02g8aCr9IRLSo_GrWf2',
  client_secret: 'EM3-QvECex9FJIzETPE8E1NloaCiJOAFCQobJgYdowsLCmPj3V2gHo5tlhFwsvj9EQdFBSCTR_XruBEc'
})

export default paypal
