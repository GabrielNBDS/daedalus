import View from '@ioc:Adonis/Core/View'
import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as ph } from '@iconify-json/ph'

View.use(edgeIconify)
addCollection(ph)
