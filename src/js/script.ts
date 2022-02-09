class Controlador{
  paises: Set<Pais>
  paisEditado: Pais
  iNombre: HTMLInputElement
  iPoblacion: HTMLInputElement
  btnCrear: HTMLButtonElement
  divEditar: HTMLElement
  iEditarNombre: HTMLInputElement
  iEditarPoblacion: HTMLInputElement
  btnModificar: HTMLButtonElement
  aCancelar: HTMLElement
  divLista: HTMLElement

  constructor(){
    window.onload = this.iniciar.bind(this)

    this.paises = new Set()
    this.paisEditado = null
  }

  iniciar(){
    //Referencias
    this.iNombre = <HTMLInputElement>document.getElementById('iNombre')
    this.iPoblacion = <HTMLInputElement>document.getElementById('iPoblacion')
    this.btnCrear = <HTMLButtonElement>document.getElementById('btnCrear')
    this.divEditar = document.getElementById('divEditar')
    this.iEditarNombre = <HTMLInputElement>document.getElementById('iEditarNombre')
    this.iEditarPoblacion = <HTMLInputElement>document.getElementById('iEditarPoblacion')
    this.btnModificar = <HTMLButtonElement>document.getElementById('btnModificar')
    this.aCancelar = document.getElementById('aCancelar')
    this.divLista = document.getElementById('divLista')

    //Eventos
    this.btnCrear.onclick = this.crear.bind(this)
    this.btnModificar.onclick = this.modificar.bind(this)
    this.aCancelar.onclick = this.cancelar.bind(this)
  }
  mostrar(){
    //Borramos el interfaz
    while (this.divLista.firstChild)
      this.divLista.firstChild.remove()
    for (let pais of this.paises){
      let p = document.createElement('p')
      p.appendChild(document.createTextNode(pais.ver()))
      let btnEditar = document.createElement('button')
      p.appendChild(btnEditar)
      btnEditar.appendChild(document.createTextNode('Editar'))
      btnEditar.onclick = this.editar.bind(this, pais)
      let btnEliminar = document.createElement('button')
      p.appendChild(btnEliminar)
      btnEliminar.appendChild(document.createTextNode('Eliminar'))
      btnEliminar.onclick = this.eliminar.bind(this, pais)

      this.divLista.appendChild(p)
    }
  }
  crear(){
    let nombre = this.iNombre.value
    let poblacion = Number(this.iPoblacion.value)
    let pais = new Pais(nombre, poblacion)
    this.paises.add(pais)

    //Borramos los campos
    this.iNombre.value = ''
    this.iPoblacion.value = ''

    this.mostrar()
  }
  editar(pais:Pais){
    this.iEditarNombre.value = pais.nombre
    this.iEditarPoblacion.value = pais.poblacion.toString()
    this.paisEditado = pais
    this.divEditar.style.display = 'block'
  }
  modificar(){
    this.paisEditado.nombre = this.iEditarNombre.value
    this.paisEditado.poblacion = Number(this.iEditarPoblacion.value)
    this.cancelar()
    this.mostrar()
  }
  cancelar(){
    this.divEditar.style.display = 'none'
  }
  eliminar(pais:Pais){
    this.paises.delete(pais)
    this.mostrar()
  }
}

class Pais{
  nombre: string
  poblacion: number

  constructor(nombre:string, poblacion:number){
    this.nombre = nombre
    this.poblacion = poblacion
  }
  ver(){
    return `${this.nombre} - ${this.poblacion} habs. `
  }
}

new Controlador()
