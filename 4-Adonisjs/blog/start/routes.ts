/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.get('/omm', async () => { return 'Hallo OMM!' })

router.get('/about', async ({ view }) =>{
  // console.log(await view.render('pages/about'))
  return view.render('pages/about', 
    {title: "Über uns", text: "Wir sind toll.",
      freunde: ['Klausi', 'Susi', 'Berti', 'Anni'],
      zahl: 5, anzeigeFreunde: true
    })
})

router.get('/contact', async ({ view})=>{
  return view.render('pages/contact')
})

router.post('/contact', async ({ request, view })=>{
  return view.render('pages/contact_result', {nachricht: request.input('nachricht')})
})

router.get('/context', async (ctx) => {
  
  return ctx

})
