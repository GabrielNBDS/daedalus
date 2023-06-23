import View from '@ioc:Adonis/Core/View'
import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as lucide } from '@iconify-json/lucide'

View.use(edgeIconify)
addCollection(lucide)
