import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';

import './App.css';

class BannerHome extends Component {
  render() {
    return (
      <div className="banner">
        <figure><img src="banner.jpg" alt="banner 1"/></figure>
      </div>
    )
  }
}

class CategoriasHome extends Component {
  render() {
    return (
      <section>
        <div className="container">
          <div className="row">
            <h2 className="subtitle">Colecciones</h2>
          </div>
          <div className="row card-categoria">
            <div className="col-md-6">
              <div className="card-small">
                <h4>Maquillajes</h4>
                <Link to="/maquillaje" className="flex align-items-center">
                  Ver productos
                  <i className="material-icons">arrow_forward</i>
                </Link>
              </div>
              <div className="card-large">
                <h4>Perfumes</h4>
                <Link to="/perfumes" className="flex align-items-center">
                  Ver productos
                  <i className="material-icons">arrow_forward</i>
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card-large">
                <h4>Accesorios</h4>
                <Link to="/accesorios" className="flex align-items-center">
                  Ver productos
                  <i className="material-icons">arrow_forward</i>
                </Link>
              </div>
              <div className="card-small">
                <h4>Catálogo</h4>
                <Link to="/catalogo" className="flex align-items-center">
                  Ver productos
                  <i className="material-icons">arrow_forward</i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

class VistaRapida  extends Component {
  constructor() {
    super();
    this.toBag = this.toBag.bind(this);
  }

  toBag(e) {
    let cantidadAgregada = Number(this.refs.selectCantidad.value);
    this.props.addProducto(cantidadAgregada, e.currentTarget.value);
    this.refs.selectCantidad.value = 1;
  }

  render() {
    return (
      <section className="vista-rapida">
        <div className="flex align-items-center container vista-rapida-main">
          <div className="vista-rapida-producto">
            <div className="cerrar-quick-view" onClick={this.props.closeVR}>
              <i className="material-icons">close</i>
            </div>
            <div className="col-md-12 col-offset-lg-1 col-lg-10">
              <div className="row">
                <aside className="col-xs-12 col-md-4 col-lg-3 producto">
                  <figure className="producto-img">
                    <img src="http://placehold.it/300" alt="Imagen del producto"/>
                  </figure>
                </aside>
                <div className="col-xs-12 col-md-8 col-lg-9">
                  <div className="row">
                    <div className="col-offset-xs-1 col-xs-10 col-offset-sm-0 col-sm-12 col-lg-8 producto producto-int-producto">
                      <div className="producto-description">
                        <div className="producto-company"><Link to={'/'+this.props.producto.company.replace(/ /g, "-").toLowerCase()}>{this.props.producto.company}</Link></div>
                        <div className="producto-name">{this.props.producto.name}</div>
                        <div className="col-lg-0 producto-price">
                          s/. {this.props.producto.price.toFixed(2)}
                          { this.props.producto.oldprice != null &&
                            <span className="producto-old-price">s/. {this.props.producto.oldprice.toFixed(2)}</span>
                          }
                        </div>
                      </div>
                      <div className="producto-atributos">
                        <p>Light Beige, Nude Beige, Brown Beige</p>
                        <div className="producto-spray">
                          <label>Opciones</label>
                          <div className="list-spray flex flex-wrap align-items-center">
                            <figure className="active center">
                              <img src="http://placehold.it/40" alt="spray 1"/>
                            </figure>
                            <figure className="center">
                              <img src="http://placehold.it/40" alt="spray 2"/>
                            </figure>
                            <figure className="center">
                              <img src="http://placehold.it/40" alt="spray 3"/>
                            </figure>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-offset-xs-1 col-xs-10 col-offset-sm-0 col-sm-12 col-lg-4 producto-int-bag">
                      {true &&
                        <div className="producto-price">
                          s/. {this.props.producto.price.toFixed(2)}
                          { this.props.producto.oldprice != null &&
                            <span className="producto-old-price">s/. {this.props.producto.oldprice.toFixed(2)}</span>
                          }
                        </div>
                      }
                      <div className="flex align-items-center producto-select-ctd">
                        <label>Cantidad</label>
                        <select ref="selectCantidad" className="select-ctd">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                        <i className="material-icons">expand_more</i>
                      </div>
                      <button type="button" className="btn" value={this.props.producto.id} onClick={this.toBag}>Agregar a la bolsa</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

class ProductoCardView extends Component {
  constructor() {
    super();
    this.quickView = this.quickView.bind(this);
  }

  quickView(e) {
    e.preventDefault();
    this.props.quickView(e.currentTarget.value);
  }
  render() {
    return (
      <Link className="producto producto-card" to={`/${(this.props.producto.company+'/'+this.props.producto.name).replace(/ /g, "-").toLowerCase()}`}>
        <figure className="producto-img">
          <img src={this.props.producto.imgURL[0].sprayURL} alt="Producto"/>
          <div className="quick-view">
            <button value={this.props.producto.id} onClick={this.quickView}>VISTA RÁPIDA</button>
          </div>
          { this.props.producto.newBadge === true &&
            <span className="producto-new">NUEVO</span>
          }
        </figure>
        <div className="producto-description">
          <div className="producto-company">{this.props.producto.company}</div>
          <div className="producto-name">{this.props.producto.name}</div>
          <div className="producto-price">
            s/. {this.props.producto.price.toFixed(2)}
            { this.props.producto.oldprice != null &&
              <span className="producto-old-price">s/. {this.props.producto.oldprice.toFixed(2)}</span>
            }
          </div>
        </div>
      </Link>
    )
  }
}

class HomeBlog extends Component {
  render() {
    return (
      <section className="margin-bottom">
        <div className="container">
          <div className="row">
            <h2 className="subtitle">Nuestras Publicaciones</h2>
          </div>
          <div className="row">
            <div className="blog-grid grid grid-md-3">
              <li className="column">
                <figure className="center"><img src="http://placehold.it/380x280" alt="blog"/></figure>
                <h4 className="title-blog">Los polvos compactos que estábamos esperando</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <a href="/blog">Leer más</a>
              </li>
              <li className="column">
                <figure className="center"><img src="http://placehold.it/380x280" alt="blog"/></figure>
                <h4 className="title-blog">La máscara de pestañas que te da lo que tú quieras</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <a href="/blog">Leer más</a>
              </li>
              <li className="column">
                <figure className="center"><img src="http://placehold.it/380x280" alt="blog"/></figure>
                <h4 className="title-blog">Dime cómo es tu madre y te diré qué regalarle</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <a href="/blog">Leer más</a>
              </li>
            </div>
            <div className="col-xs-12 flex">
              <Link to="/blog" className="btn">Ver Todas las Publicaciones</Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

class Home extends Component {
  constructor() {
    super();
    this.state = {
      topProductos: []
    }
  }

  componentWillMount() {
    let masVendidos = this.props.products.sort((a,b)=>a.sales-b.sales).reverse().slice(0, 4);
    this.setState({ topProductos: masVendidos })
  }

  render() {
    return (
      <div className="App">
        <BannerHome />
        <CategoriasHome />
        <section>
          <div className="container">
            <div className="row">
              <h2 className="subtitle">Productos Populares</h2>
            </div>
            <div className="row">
              <div className="grid grid-xs-2 grid-sm-3 grid-lg-4">
                { this.state.topProductos.map((producto, i) => (
                  <li className="column" key={i}>
                    <ProductoCardView producto={producto} quickView={this.props.quickView}/>
                  </li>
                  ))
                }
              </div>
              <div className="col-xs-12 flex">
                <Link to="/catalogo" className="btn">Ver Todos los Productos</Link>
              </div>
            </div>
          </div>
        </section>
        <HomeBlog />
      </div>
    );
  }
}

class Categoria extends Component {
  render() {
    var obtenerCategoria = this.props.categoria.filter( elemento => (
      elemento.company.replace(/ /g, "-").toLowerCase() === this.props.match
    ));
    return (
      <section>
        <div className="container">
          <div className="row">
            <h2 className="subtitle">Productos Populares</h2>
          </div>
          <div className="row">
            <div className="grid grid-sm-2 grid-md-4">
              { obtenerCategoria.map((producto, i) => (
                <li className="column" key={i}>
                  <Link to={this.props.matchUrl+'/'+producto.name.replace(/ /g, "-").toLowerCase()} className="producto">
                    <div className="producto-img">
                      <img src={producto.imgURL[0].sprayURL} alt="Producto"/>
                      { producto.newBadge === true &&
                        <span className="producto-new">NUEVO</span>
                      }
                    </div>
                    <div className="producto-company">{producto.company}</div>
                    <h5 className="producto-name">{producto.name}</h5>
                    <div className="producto-price">
                      s/. {producto.price.toFixed(2)}
                      { producto.oldprice != null &&
                        <span className="producto-old-price">s/. {producto.oldprice.toFixed(2)}</span>
                      }
                    </div>
                  </Link>
                </li>
                ))
              }
            </div>
          </div>
        </div>
      </section>
    )
  }
}

class ProductoComplemento extends Component {
  render() {
    return(
      <div className="row">
        <div className="col-xs-12">
          <h5>Productos Complementarios</h5>
        </div>
        <div className="grid grid-xs-1">
          { this.props.complemento.map((producto,i) => (
            <li className="column" key={i}>
              <div className="flex align-items-center producto producto-complement">
                <div className="producto-img">
                  <a href={`/${(producto.company+'/'+producto.name).replace(/ /g, "-").toLowerCase()}`}>
                    <img src={producto.imgURL[0].sprayURL} alt="Imagen del producto"/>
                  </a>
                </div>
                <div className="flex flex-1 producto-complement-description">
                  <div className="flex-1 producto-description">
                    <div className="producto-company">{producto.company}</div>
                    <div className="producto-name">{producto.name}</div>
                    <div className="producto-price">
                      s/. {producto.price.toFixed(2)}
                      { producto.oldprice != null &&
                        <span className="producto-old-price">s/. {producto.oldprice.toFixed(2)}</span>
                      }
                    </div>
                  </div>
                  <button type="button" className="btn" value={producto.id} onClick={this.props.toBag}>
                    <i className="material-icons">add</i>
                  </button>
                </div>
              </div>
            </li>
          ))
          }
        </div>
      </div>
    )
  }
}

class Producto extends Component {
  constructor() {
    super();
    this.toBag = this.toBag.bind(this);
    this.state = {
      producto: [],
      complemento: [],
      similares: [],
      queryMD: false,
      queryLG: false
    }
  }

  toBag(e) {
    let cantidadAgregada = Number(this.refs.selectCantidad.value);
    this.props.addProducto(cantidadAgregada, e.currentTarget.value);
    this.refs.selectCantidad.value = 1;
  }

  componentWillMount() {
    let obtenerProducto = this.props.producto.filter( elemento => (
      elemento.name.replace(/ /g, "-").toLowerCase() === this.props.match
    ));
    this.state.producto.push(obtenerProducto[0]);

    let refProducto = this;
    let complemento = this.state.producto[0].complemento;
    this.props.producto.filter(function(producto) {
      for (var i in complemento) {
        if ( producto.id === complemento[i] ) {
          refProducto.state.complemento.push(producto);
        }
      }
      return false
    });

    let productosSimilares = this.props.producto.filter( elemento =>
      elemento.category === obtenerProducto[0].category && elemento.id !== obtenerProducto[0].id
    ).sort((a,b)=>a.sales-b.sales).reverse().slice(0, 5);
    this.setState({ similares: productosSimilares });

    //BREAKPOINTS
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth;
        //y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    if( x >= 768 ) {
      this.setState({ queryMD: true });
    }
    if ( x >= 992 ) {
      this.setState({ queryLG: true });
    }
  }

  render() {
    return (
      <section>
        <div className="container">
          {/* <Route path="/:categoria/:producto" component={Topic}/> */}
            { this.state.producto.map((producto,i) => (
              <div className="row" key={i}>
                {this.state.queryMD &&
                  <aside className="col-xs-12 col-md-4 col-lg-3 producto">
                    <figure className="producto-img">
                      <img src="http://placehold.it/300" alt="Imagen del producto"/>
                    </figure>
                  </aside>
                }
                <div className="col-xs-12 col-md-8 col-lg-9">
                  <div className="row">
                    <div className="col-offset-xs-1 col-xs-10 col-offset-sm-0 col-sm-12 col-lg-8 producto producto-int-producto">
                      <div className="producto-description">
                        <div className="producto-company"><Link to={'/'+producto.company.replace(/ /g, "-").toLowerCase()}>{producto.company}</Link></div>
                        <div className="producto-name">{producto.name}</div>
                        <div className="col-lg-0 producto-price">
                          s/. {producto.price.toFixed(2)}
                          { producto.oldprice != null &&
                            <span className="producto-old-price">s/. {producto.oldprice.toFixed(2)}</span>
                          }
                        </div>
                      </div>
                      {!this.state.queryMD &&
                        <figure className="col-md-0 producto-img">
                          <img src="http://placehold.it/300" alt="Producto"/>
                        </figure>
                      }
                      <div className="producto-atributos">
                        <p>Light Beige, Nude Beige, Brown Beige</p>
                        <div className="producto-spray">
                          <label>Opciones</label>
                          <div className="list-spray flex flex-wrap align-items-center">
                            <figure className="active center">
                              <img src="http://placehold.it/40" alt="spray 1"/>
                            </figure>
                            <figure className="center">
                              <img src="http://placehold.it/40" alt="spray 2"/>
                            </figure>
                            <figure className="center">
                              <img src="http://placehold.it/40" alt="spray 3"/>
                            </figure>
                          </div>
                        </div>
                        {/* <div className="flex">
                          <Link to={`${this.props.matchUrl}/red`}>Red</Link>
                          <Link to={`${this.props.matchUrl}/blue`}>Blue</Link>
                          <Link to={`${this.props.matchUrl}/green`}>Green</Link>
                          <Link to={`${this.props.matchUrl}/yellow`}>Yellow</Link>
                          <Link to={`${this.props.matchUrl}/orange`}>Orange</Link>
                        </div> */}
                      </div>
                    </div>
                    <div className="col-offset-xs-1 col-xs-10 col-offset-sm-0 col-sm-12 col-lg-4 producto-int-bag">
                      {this.state.queryLG &&
                        <div className="producto-price">
                          s/. {producto.price.toFixed(2)}
                          { producto.oldprice != null &&
                            <span className="producto-old-price">s/. {producto.oldprice.toFixed(2)}</span>
                          }
                        </div>
                      }
                      <div className="flex align-items-center producto-select-ctd">
                        <label>Cantidad</label>
                        <select ref="selectCantidad" className="select-ctd">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                        <i className="material-icons">expand_more</i>
                      </div>
                      <button type="button" className="btn" value={producto.id} onClick={this.toBag}>Agregar a la bolsa</button>
                    </div>
                  </div>
                  <ProductoComplemento complemento={this.state.complemento} toBag={this.toBag}/>
                </div>
              </div>
              ))
            }
            <div className="row">
              <div className="col-xs-12">
                <h5>Productos Similares</h5>
              </div>
            </div>
          <div className="row">
            <div className="grid grid-xs-2 grid-sm-3 grid-md-4 grid-lg-5">
              { this.state.similares.map((producto, i) => (
                <li className="column" key={i}>
                  <ProductoCardView producto={producto} quickView={this.props.quickView}/>
                </li>
                ))
              }
            </div>
          </div>
        </div>
      </section>
    )
  }
}

class ResumenBag extends Component {
  constructor() {
    super();
    this.bagEliminar = this.bagEliminar.bind(this);
  }

  bagEliminar(e) {
    this.props.deleteProduct(e.currentTarget.value);
  }

  render() {
    var dobles  = this.props.productsBag.map(function(num) {
      return num.porComprar*num.price;
    });
    let total = 0;
    for(let i in dobles) {
      total += dobles[i];
    }
    return (
      <div id="bag-resumen" onMouseOver={this.props.mostrar} onMouseLeave={this.props.ocultar}>
        <div className="bag-resumen-main">
          <div className="row">
            <div className="col-xs-12">
                {this.props.cantidadBag === 0 ? (
                  <p>Tu bolsa de compra está vacía.</p>
                ) : (
                  <div>
                    <h5>{`${this.props.cantidadBag} ${this.props.cantidadBag === 1 ? 'producto' : 'productos'} en tu bolsa`}</h5>
                  </div>
                )}
            </div>
          </div>
          <div className="row">
            <div className="grid grid-xs-1">
              { this.props.productsBag.map((producto,i) => (
                <li className="column" key={i}>
                  <div className="flex align-items-center producto bag-resumen">
                    <div className="producto-img">
                      <Link to={`/${(producto.company+'/'+producto.name).replace(/ /g, "-").toLowerCase()}`}>
                        <img src={producto.imgURL[0].sprayURL} alt="Imagen del producto"/>
                      </Link>
                    </div>
                    <div className="flex flex-1 bag-resumen-description">
                      <div className="flex-1 producto-description">
                        <div className="producto-company">{producto.company}</div>
                        <div className="producto-name">{producto.name}</div>
                        <div>
                          <div className="producto-price">
                            s/. {producto.price.toFixed(2)}
                            { producto.oldprice != null &&
                              <span className="producto-old-price">s/. {producto.oldprice.toFixed(2)}</span>
                            }
                            {' '}| {producto.porComprar} unids.
                          </div>
                        </div>

                      </div>
                      <button type="button" value={producto.id} onClick={this.bagEliminar}>
                        <i className="material-icons">close</i>
                      </button>
                    </div>
                  </div>
                </li>
              ))
              }
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              {this.props.productsBag.length !== 0 &&
                <p>Total: s/. {total}</p>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Bag extends Component {
  constructor() {
    super();
    //this.totales = this.totales.bind(this);
    this.bagCantidad = this.bagCantidad.bind(this);
    this.bagEliminar = this.bagEliminar.bind(this);
    this.descuento = this.descuento.bind(this);
    this.delivery = this.delivery.bind(this);
    this.state = {
      subtotal: 0.00,
      descuento: 0.00,
      envio: 0.00,
      total: 0.00
    }
  }

  bagCantidad() {
    this.props.changeCantidad(this.refs);
  }

  bagEliminar(e) {
    this.props.deleteProduct(e.currentTarget.value);
  }

  descuento(e) {
    let refDesc = this;
    if (this.refs.cuponDesc.value === "") {
      console.log('Ingresa un código');
      e.preventDefault();
    } else if (this.refs.cuponDesc.value === 'xl') {
      if( refDesc.state.descuento <= 0 ) {
        console.log('Descuento aplicado');
        refDesc.setState({ descuento: 20 });
      } else {
        console.log('El descuento ya fue aplicado');
      }
    } else {
      console.log('Código incorrecto');
    }
  }

  delivery() {
    this.setState({ envio: Number(this.refs.distritoEnvio.value) });
  }

  componentWillMount() {
    var dobles = this.props.productsBag.map(function(num) {
      return num.porComprar*num.price;
    });
    let total = 0;
    for(let i in dobles) {
      total += dobles[i];
    }
    this.setState({ total: total })
  }

  render() {
    var dobles = this.props.productsBag.map(function(num) {
      return num.porComprar*num.price;
    });
    let total = 0;
    for(let i in dobles) {
      total += dobles[i];
    }
    return (
      <section>
        <div className="container">
          <div className="row">
            {this.props.productsBag.length === 0 ? (
              <p>Tu bolsa de compra está vacía.</p>
            ) : (
              <h2 className="subtitle">Tu Bolsa de Compra</h2>
            )}
          </div>
          <div className="row">
            <div className="grid grid-xs-1">
              { this.props.productsBag.map((producto,i) => (
                <li className="column" key={i}>
                  <div className="flex align-items-center producto producto-complement bag-item">
                    <div className="producto-img">
                      <Link to={`/${(producto.company+'/'+producto.name).replace(/ /g, "-").toLowerCase()}`}>
                        <img src={producto.imgURL[0].sprayURL} alt="Imagen del producto"/>
                      </Link>
                    </div>
                    <div className="producto-description flex-1">
                      <div className="bag-description">
                        <div className="producto-company">{producto.company}</div>
                        <div className="producto-name">{producto.name}</div>
                      </div>
                      <div className="flex align-items-center bag-options">
                        <div className="producto-price">
                          s/. {producto.price.toFixed(2)}
                          { producto.oldprice != null &&
                            <span className="producto-old-price">s/. {producto.oldprice.toFixed(2)}</span>
                          }
                        </div>
                        <div className="flex align-items-center producto-select-ctd">
                          <label>Cantidad</label>
                          <select value={producto.porComprar} ref={producto.id} className="select-ctd" onChange={this.bagCantidad}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                          </select>
                          <i className="material-icons">expand_more</i>
                        </div>
                        <button type="button" value={producto.id} onClick={this.bagEliminar}>
                          <i className="material-icons">close</i>
                        </button>
                      </div>
                    </div>
                    {/* <div className="flex align-items-center">
                      <div className="bag-producto-price producto-price">
                        s/. {producto.price.toFixed(2)}
                        { producto.oldprice != null &&
                          <span className="producto-old-price">s/. {producto.oldprice.toFixed(2)}</span>
                        }
                      </div>
                    </div> */}
                  </div>
                </li>
                ))
              }
            </div>
          </div>
          {this.props.productsBag.length !== 0 &&
            <div className="row">
              <div className="col-xs-12">
                  <p>Sub-Total: s/.{total}</p>
                  <p>Envío: s/.{this.state.envio}</p>
                  <div className="flex align-items-center producto-select-ctd">
                    <label>Distrito</label>
                    <select ref="distritoEnvio" className="select-ctd" onChange={this.delivery}>
                      <option value="0">Seleccionar</option>
                      <option value="10">Barranco</option>
                      <option value="20">Breña</option>
                      <option value="30">Cercado de Lima</option>
                      <option value="40">Jesús María</option>
                      <option value="50">La Molina</option>
                      <option value="50">Miraflores</option>
                      <option value="40">San Borja</option>
                      <option value="30">San Isidro</option>
                      <option value="20">San Miguel</option>
                      <option value="10">Santiago de Surco</option>
                    </select>
                    <i className="material-icons">expand_more</i>
                  </div>
                  <p>Total: s/. {total + this.state.envio}</p>
                  <input ref="cuponDesc" placeholder="Cupón de Descuento" type="tex"/>
                  <button value={total} onClick={this.descuento}>Aplicar</button>

              </div>
            </div>
          }
        </div>
      </section>
    )
  }
}

const Login = () => <h2>Login</h2>
const Favoritos = () => <h2>Favoritos</h2>
const Maquillaje = () => <h2>Maquillaje</h2>
const Perfumes = () => <h2>Perfumes</h2>
const Accesorios = () => <h2>Accesorios</h2>
const Catalogo = () => <h2>Catálogo</h2>
const Blog = () => <h2>Blog</h2>

class App extends Component {
  constructor() {
    super();
    this.addBag = this.addBag.bind(this);
    this.changeCantidad = this.changeCantidad.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.handleFilterProduct = this.handleFilterProduct.bind(this);
    this.blurFilter = this.blurFilter.bind(this);
    this.quickView = this.quickView.bind(this);
    this.cerrarVistaRapida = this.cerrarVistaRapida.bind(this);
    this.mostrarResumen = this.mostrarResumen.bind(this);
    this.ocultarResumen = this.ocultarResumen.bind(this);
    this.state = {
      productos: [
        {
          id: 1,
					name: 'Diorskin Forever Perfect Foundation Broad Spectrum SPF 35',
					company: 'Dior',
          category: 'maquillaje',
          imgURL: [
            {
              sprayURL: 'http://placehold.it/200'
            }
          ],
          newBadge: true,
          price: 50.00,
          stock: 10,
          sales: 10
				},
				{
          id: 2,
					name: 'Perfect Hair Day Shampoo',
					company: 'Living Proof',
          category: 'perfume',
          imgURL: [
            {
              sprayURL: 'http://placehold.it/200'
            }
          ],
          newBadge: false,
          price: 50.00,
          stock: 10,
          sales: 30
				},
				{
          id: 3,
					name: 'Clémentine California Cologne Absolue Pure Perfume',
					company: 'Atelier Cologne',
          category: 'accesorio',
          imgURL: [
            {
              sprayURL: 'http://placehold.it/200'
            }
          ],
          newBadge: true,
          price: 50.00,
          stock: 10,
          sales: 20
				},
        {
          id: 4,
					name: 'Noir Couture Mascara Set',
					company: 'Givenchy',
          category: 'accesorio',
          imgURL: [
            {
              sprayURL: 'http://placehold.it/200'
            }
          ],
          newBadge: false,
          price: 50.00,
          stock: 10,
          sales: 40
				},
				{
          id: 5,
					name: 'GLOWSETTER™ Makeup Setting Spray',
					company: 'GLAMGLOW',
          category: 'maquillaje',
          imgURL: [
            {
              sprayURL: 'http://placehold.it/200'
            }
          ],
          newBadge: false,
          price: 50.00,
          stock: 10,
          sales: 50
				},
				{
          id: 6,
					name: 'Dewy Stix - Luminous Highlighting Balm',
					company: 'Ciaté London',
          category: 'perfume',
          imgURL: [
            {
              sprayURL: 'http://placehold.it/200'
            }
          ],
          newBadge: true,
          price: 50.00,
          stock: 10,
          sales: 60
				},
        {
          id: 7,
					name: 'Whipped Argan Oil Face Butter',
					company: 'Josie Maran',
          category: 'maquillaje',
          imgURL: [
            {
              sprayURL: 'http://placehold.it/200'
            }
          ],
          newBadge: true,
          price: 50.00,
          stock: 10,
          sales: 70
				},
				{
          id: 8,
					name: 'Water Drench Hyaluronic Cloud Cream',
					company: 'Peter Thomas Roth',
          category: 'perfume',
          imgURL: [
            {
              sprayURL: 'http://placehold.it/200'
            }
          ],
          newBadge: false,
          price: 50.00,
          stock: 10,
          sales: 80
				},
				{
          id: 9,
					name: 'Scalp Revival Charcoal + Tea Tree Scalp Treatment',
					company: 'Briogeo',
          category: 'accesorio',
          imgURL: [
            {
              sprayURL: 'http://placehold.it/200'
            }
          ],
          newBadge: true,
          price: 50.00,
          stock: 10,
          sales: 90
				},
        {
          id: 10,
					name: 'Full-On™ Lip Cream',
					company: 'Buxom',
          category: 'accesorio',
          imgURL: [
            {
              sprayURL: 'http://placehold.it/200'
            }
          ],
          newBadge: false,
          price: 50.00,
          stock: 10,
          sales: 100
				},
				{
          id: 11,
					name: 'Florence',
					company: 'TOCCA',
          category: 'maquillaje',
          imgURL: [
            {
              sprayURL: 'http://placehold.it/200'
            }
          ],
          newBadge: false,
          price: 50.00,
          stock: 10,
          sales: 110
				},
				{
          id: 12,
					name: 'BECCA X Chrissy Teigen Glow Face Palette',
					company: 'BECCA',
          category: 'perfume',
          imgURL: [
            {
              sprayURL: 'http://placehold.it/200'
            }
          ],
          newBadge: true,
          price: 50.00,
          stock: 10,
          sales: 120
				},
        {
          id: 13,
					name: 'Noni Glow Face Oil',
					company: 'KORA Organics',
          category: 'maquillaje',
          imgURL: [
            {
              sprayURL: 'http://placehold.it/200'
            }
          ],
          newBadge: false,
          price: 50.00,
          oldprice: 60.00,
          stock: 15,
          sales: 130
				},
				{
          id: 14,
					name: 'Rainforest of the Sea™ Tarte Twinkle Stick Highlighter',
					company: 'tarte',
          category: 'accesorio',
          imgURL: [
            {
              color: 'red',
              sprayURL: 'http://placehold.it/200'
            },
            {
              color: 'blue',
              sprayURL: 'http://placehold.it/200'
            },
            {
              color: 'green',
              sprayURL: 'http://placehold.it/200'
            },
            {
              color: 'yellow',
              sprayURL: 'http://placehold.it/200'
            },
            {
              color: 'orange',
              sprayURL: 'http://placehold.it/200'
            }
          ],
          newBadge: false,
          price: 50.00,
          stock: 10,
          sales: 140
				},
				{
          id: 15,
					name: 'Hair Supplement for Thinning Hair',
          complemento: [14,13],
					company: 'Ouai',
          category: 'maquillaje',
          imgURL: [
            {
              sprayURL: 'http://placehold.it/200'
            }
          ],
          newBadge: true,
          price: 50.00,
          stock: 8,
          sales: 150
				}
      ],
      productosCategorizados: [],
      productosBag: [],
      busqueda: [],
      busquedaView: false,
      itemsBag: 0,
      quickView: false,
      resumenView: 0,
      vistaRapida: [],
      montoSubtotal: 0,
      descuento: 0,
      montoTotal: 0
    }
  }

  changeCantidad(selectRef) {
    let cesta = this.state.productosBag;
    for(let idRef in selectRef) {
      cesta.forEach(function(elemento) {
        if(elemento.id === Number(idRef)) {
          if( Number(selectRef[idRef].value) > elemento.stock) {
            elemento.porComprar = elemento.stock;
            selectRef[idRef].value = elemento.stock;
            console.log('Nuestro stock máximo para este producto son '+elemento.stock+' unids');
          } else {
            elemento.porComprar = Number(selectRef[idRef].value);
          }
        }
      })
    }
    let total = 0;
    for(let i in cesta) {
      total += Number(cesta[i].porComprar);
    }
    this.setState({ itemsBag: total });
  }

  deleteProduct(productoEliminado) {
    let cesta = this.state.productosBag;
    let refApp = this;
    cesta.forEach(function(elemento, index) {
      if( elemento.id === Number(productoEliminado) ) {
        refApp.setState((prevState) => ({
          itemsBag: prevState.itemsBag - elemento.porComprar
        }));
        cesta.splice(index, 1);
      }
    })
  }

  addBag(cantidadAgregada, idProductoAgregado) {

    // Cerrar Vista Rápida
    document.getElementsByTagName('html')[0].style.overflowY = 'auto';
    this.setState({ quickView: false });

    let cesta = this.state.productosBag;
    let refApp = this;

    // Mostrar Resumen de la Bolsa de Compra
    document.getElementById('bag-resumen').style.display = 'block';
    setTimeout(function() {
      if( refApp.state.resumenView <= 0 ) {
        document.getElementById('bag-resumen').style.display = 'none';
      }
    }, 4000);

    let mySet = new Set();
    let productAdd = this.state.productos.filter( producto => (
      producto.id === Number(idProductoAgregado)
    ));
    let productoAgregado = productAdd[0];

    cesta.forEach( function(producto) {
      mySet.add(producto.id);
      if(producto.id === productoAgregado.id) {
        let valorAnterior = producto.porComprar;
        let valorFinal = valorAnterior + cantidadAgregada;
        let stock = productoAgregado.stock;
        if( valorFinal <= stock &&  valorFinal <= 10 ) {
          refApp.setState((prevState) => ({
            itemsBag: prevState.itemsBag + cantidadAgregada
          }));
          producto.porComprar = valorFinal;
        } else if ( ( valorFinal <= stock &&  valorFinal > 10 ) || ( valorFinal > stock && stock > 10 ) ) {
          refApp.setState((prevState) => ({
            itemsBag: prevState.itemsBag + (10 - valorAnterior)
          }));
          console.log('Como máximo se pueden comprar 10 unidades por producto.');
          producto.porComprar = 10;
        } else {
          refApp.setState((prevState) => ({
            itemsBag: prevState.itemsBag + (stock - valorAnterior)
          }));
          console.log('Nuestro stock máximo para este producto es '+stock+' unids');
          producto.porComprar = stock;
        }
      }
    })

    if( !mySet.has(productoAgregado.id) ) {
      if ( cantidadAgregada > productoAgregado.stock ) {
        console.log('Se han añadido '+productoAgregado.stock+' productos debido a que la cantidad solicitada supera nuestro stock.');
        refApp.setState((prevState) => ({
          itemsBag: prevState.itemsBag + productoAgregado.stock
        }));
        productoAgregado.porComprar = productoAgregado.stock;
      } else {
        refApp.setState((prevState) => ({
          itemsBag: prevState.itemsBag + cantidadAgregada
        }));
        productoAgregado.porComprar = cantidadAgregada;
      }
      cesta.push(productoAgregado);
    }
  }

  handleFilterProduct(e) {
    this.setState({ busquedaView: true });
    if( e.target.value !== "" ) {
      let filtrado = this.state.productos.filter( producto => (
        producto.company.toLowerCase().includes((e.target.value).toLowerCase()) || producto.name.toLowerCase().includes((e.target.value).toLowerCase())
      )).slice(0, 10);
      this.setState({ busqueda: filtrado });
    } else {
      this.setState({ busqueda: [] });
    }
    //console.log(this.state.busqueda);
  }

  blurFilter(e) {
    if( e.currentTarget.tagName === "A") {
      this.refs.inputFilter.value = "";
    }
    let refFilter = this;
    setTimeout( function() {
      refFilter.setState({ busquedaView: false });
    }, 150);
  }

  quickView(idProductoAgregado) {
    document.getElementsByTagName('html')[0].style.overflowY = 'hidden';
    let producto = this.state.productos.filter(elemento => elemento.id === Number(idProductoAgregado));
    this.setState({ vistaRapida: producto });
    this.setState({ quickView: true });
  }

  cerrarVistaRapida() {
    document.getElementsByTagName('html')[0].style.overflowY = 'auto';
    this.setState({ quickView: false });
  }

  mostrarResumen() {
    this.setState({ resumenView: 1 });
    document.getElementById('bag-resumen').style.display = 'block';
  }

  ocultarResumen() {
    this.setState({ resumenView: 0 });
    let refResumen = this;
    setTimeout(function() {
      if( refResumen.state.resumenView <= 0 ) {
        document.getElementById('bag-resumen').style.display = 'none';
      }
    }, 100);
  }

  render() {
    return (
      <Router>
        <div>
          <header>
            <div className="top-header flex align-items-center">
              <div className="flex header-icon align-items-center">
                <i className="material-icons">search</i>
                <input ref="inputFilter" className="inputSearch" placeholder="Buscar" onChange={this.handleFilterProduct} onFocus={this.handleFilterProduct} onBlur={this.blurFilter}/>
                {this.state.busquedaView &&
                  <div className="mainSearch">
                    {this.state.busqueda.map((producto, i) => (
                      <Link key={i} onClick={this.blurFilter} to={`/${(producto.company+'/'+producto.name).replace(/ /g, "-").toLowerCase()}`}>{(producto.company).toUpperCase() +' - '+ producto.name}</Link>
                    ))
                    }
                  </div>
                }
              </div>
              <div className="App-logo">
                <Link to="/">STORE</Link>
              </div>
              <div className="flex header-icon align-items-center justify-content-end">
                <Link to="/login" className="flex align-items-center">
                  <i className="material-icons">person</i>
                </Link>
                <Link to="/favoritos" className="flex align-items-center">
                  <i className="material-icons">favorite</i>
                </Link>
                <Link to="/bag" ref="iconbag" className="flex align-items-center" onMouseOver={this.mostrarResumen} onMouseOut={this.ocultarResumen}>
                  <i className="material-icons">shopping_basket</i>
                  { this.state.itemsBag > 0 &&
                    <div className="cart-badge">{this.state.itemsBag}</div>
                  }
                </Link>
              </div>
            </div>
            <nav className="flex align-items-center">
              <li><NavLink exact to="/" activeClassName="nav-active">Home</NavLink></li>
              <li><NavLink to="/maquillaje" activeClassName="nav-active">Maquillaje</NavLink></li>
              <li><NavLink to="/perfumes" activeClassName="nav-active">Perfumes</NavLink></li>
              <li><NavLink to="/accesorios" activeClassName="nav-active">Accesorios</NavLink></li>
              <li><NavLink to="/catalogo" activeClassName="nav-active">Catálogo</NavLink></li>
              <li><NavLink to="/blog" activeClassName="nav-active">Blog</NavLink></li>
            </nav>
          </header>
          <ResumenBag mostrar={this.mostrarResumen} ocultar={this.ocultarResumen} productsBag={this.state.productosBag} cantidadBag={this.state.itemsBag} deleteProduct={this.deleteProduct}/>
          <Switch>
            <Route exact path="/" render={() => <Home products={this.state.productos} addProducto={this.addBag} quickView={this.quickView} />} />
            <Route path="/maquillaje" component={Maquillaje} />
            <Route path="/perfumes" component={Perfumes} />
            <Route path="/accesorios" component={Accesorios} />
            <Route path="/catalogo" component={Catalogo} />
            <Route path="/blog" component={Blog} />
            <Route path="/login" component={Login} />
            <Route path="/favoritos" component={Favoritos} />
            <Route path="/bag" render={() => <Bag productsBag={this.state.productosBag} changeCantidad={this.changeCantidad} deleteProduct={this.deleteProduct}/>} />
            <Route exact path="/:categoria" render={({ match }) => <Categoria match={match.params.categoria} matchUrl={match.url} categoria={this.state.productos} />} />
            <Route path="/:categoria/:producto" render={({ match }) => <Producto match={match.params.producto} matchUrl={match.url} producto={this.state.productos} addProducto={this.addBag} quickView={this.quickView} />} />
          </Switch>
          {this.state.quickView &&
            <VistaRapida producto={this.state.vistaRapida[0]} closeVR={this.cerrarVistaRapida} addProducto={this.addBag} />
          }
          <footer>
            <div className="container">
              <div className="row">
                <div className="grid grid-md-4">
                  <li className="column">
                    <h6>Empresa</h6>
                    <a href="">Enlace 1</a>
                    <a href="">Enlace 2</a>
                    <a href="">Enlace 3</a>
                    <a href="">Enlace 4</a>
                    <a href="">Enlace 5</a>
                  </li>
                  <li className="column">
                    <h6>Mi Cuenta</h6>
                    <a href="">Enlace 1</a>
                    <a href="">Enlace 2</a>
                    <a href="">Enlace 3</a>
                    <a href="">Enlace 4</a>
                    <a href="">Enlace 5</a>
                  </li>
                  <li className="column">
                    <h6>Ayuda</h6>
                    <a href="">Enlace 1</a>
                    <a href="">Enlace 2</a>
                    <a href="">Enlace 3</a>
                    <a href="">Enlace 4</a>
                    <a href="">Enlace 5</a>
                  </li>
                  <li className="column">
                    <h6>Soporte</h6>
                    <a href="">Enlace 1</a>
                    <a href="">Enlace 2</a>
                    <a href="">Enlace 3</a>
                    <a href="">Enlace 4</a>
                    <a href="">Enlace 5</a>
                  </li>
                </div>
              </div>
            </div>
          </footer>

        </div>
      </Router>
    );
  }
}

export default App;
