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

