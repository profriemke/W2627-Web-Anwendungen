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
import db from '@adonisjs/lucid/services/db'

let count = 0

const votes = {
  spitze: 0,
  geht: 0,
  weg: 0
}



router.get('/omm', async () => { return 'Hallo OMM!' })

router.get('/about', async ({ view }) => {
  // console.log(await view.render('pages/about'))
  return view.render('pages/about',
    {
      title: "Über uns", text: "Wir sind toll.",
      freunde: ['Klausi', 'Susi', 'Berti', 'Anni'],
      zahl: 5, anzeigeFreunde: true
    })
})

router.get('/contact', async ({ view }) => {
  return view.render('pages/contact')
})

router.post('/contact', async ({ request, view }) => {
  return view.render('pages/contact_result', { nachricht: request.input('nachricht') })
})

router.get('/context', async (ctx) => {

  return ctx

})


router.get('/count', async ({ view }) => {
  count++
  return view.render('pages/count', { count })
})

router.get('/vote', async ({ view }) => {
  return view.render('pages/vote')
})

router.post('/vote', async ({ view, request }) => {
  const vote = request.input('vote')
  if (vote === 'spitze') {
    votes.spitze++
  }
  if (vote === 'geht') {
    votes.geht++
  }
  if (vote === 'weg') {
    votes.weg++
  }
  return view.render('pages/vote_result', { votes })

})

router.get('/customers', async ({ view }) => {
  const customers  = await db.from('customer')
    .select('first_name', 'last_name')
    .where('postal_code', 72658)
    .limit(10)
  return view.render('pages/customers', 
                      { customers: customers }
  )
})