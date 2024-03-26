export default class UserDto {
  email
  id
  isActivated
  addres
  roles
  orders
  logo
  about
  date
  constructor(model) {
    this.email = model.email
    this.id = model._id
    this.isActivated = model.isActivated
    this.addres = model.addres
    this.roles = model.roles
    this.orders = model.orders
    this.logo = model.logo
    this.INN = model.INN
    this.companyName = model.companyName
    this.about = model.about
    this.date = model.date
  }
}
