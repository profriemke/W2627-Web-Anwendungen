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



router.get('/', async ({ view })=>{

  const posts = await db.from('post')
                        .select('*')
                        .orderBy('id', 'desc')
  console.log(posts)
  console.log( await view.render('pages/posts/index', { posts: posts}))

  return view.render('pages/posts/index', { posts: posts})
} )

router.get('/admin/posts/create', async ({ view })=>{
  return view.render('pages/admin/posts/create')
})

router.post('/admin/posts/created', async ({ request, response })=>{
  const title = request.input('title')
  const teaser = request.input('teaser')
  const text = request.input('text')
  const author = request.input('author')
  
  if(!title || !teaser || !text || !author ){
    return 'Fehler!'
  }
  
  await db.table('post')
          .insert(
            {
              title: title,
              teaser:teaser,
              text:text,
              author: author,
              date: new Date().toString()
            }
          )
          
  return response.redirect('/')
})



router.get('/posts/:id', async({view, params})=>{

  const post = await db.from('post')
                 .select('*')
                 .where('id', params.id)
                 .first()
  console.log(post)
  return view.render('pages/posts/show', { post })

})



router.get('/session/text', async ({ session }) => {
  session.put('text', 'Riemke war da')
  return 'Wert gesetzt'
})

router.get('/session/text/show', async ({ session }) => {
  return session.get('text')
})

router.get('/session/counter', async ({ view, session }) => {
  const count = session.get('count')

  if (count === undefined) {
    session.put('count', 1)
  } else {
    session.put('count', count + 1)
  }

  return view.render('pages/session/counter', {
    count: session.get('count'),
  })
})