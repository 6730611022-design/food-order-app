import { pinia } from '../stores/pinia'
export default ({ app }) => {
  app.use(pinia)
}
