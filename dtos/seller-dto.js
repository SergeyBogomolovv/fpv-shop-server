export default class SellerDto {
  id
  roles
  INN
  logo
  companyName
  about
  date
  constructor(model) {
    this.id = model._id
    this.roles = model.roles
    this.INN = model.INN
    this.logo = model.logo
    this.companyName = model.companyName
    this.about = model.about
    this.date = model.date
  }
}
