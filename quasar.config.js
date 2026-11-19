export default function () {
  return {
    boot: ['pinia'],
    css: ['app.scss'],
    extras: ['roboto-font', 'material-icons'],
    build: {
      target: { browser: ['es2022', 'firefox115', 'chrome115', 'safari14'], node: 'node20' },
      
      vueRouterMode: 'hash'
    },
    devServer: { open: true },
    framework: { config: {}, plugins: ['Notify', 'Dialog'] },
    animations: []
  }
}
