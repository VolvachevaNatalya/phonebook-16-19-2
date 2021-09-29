import {Component, Input, OnInit, Output} from '@angular/core';
import {Address} from "../../../model/address";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['../address.component.css']
})
export class EditAddressComponent implements OnInit {
  @Input()
  public address: Address = {} as Address;
  @Output()
  public addressChanged = new EventEmitter<Address>();
  @Input()
  public addressEditFlag = false;

  public imageSave = "assets/images/save.png";
  public imageEdit = "assets/images/edit.png";

  addressForm: FormGroup = new FormGroup({});

  constructor() {
  }

  ngOnInit(): void {
    this.addressForm = new FormGroup({
      id: new FormControl(this.address?.id),
      country: new FormControl(this.address?.country, [Validators.required, this.noWhitespaceValidator]),
      city: new FormControl(this.address?.city, [Validators.required, this.noWhitespaceValidator]),
      index: new FormControl(this.address?.index, [Validators.required, Validators.minLength(3), this.noWhitespaceValidator]),
      street: new FormControl(this.address?.street, [Validators.required, this.noWhitespaceValidator]),
      homeNr: new FormControl(this.address?.homeNr, [Validators.required, this.noWhitespaceValidator]),
      isFavorite: new FormControl(this.address?.isFavorite),
      contactId: new FormControl(this.address?.contactId)
    })
  }

  toggleEditAddress() {
    this.addressEditFlag = !this.addressEditFlag;
  }

  toggleStar() {
    this.address.isFavorite = !this.address.isFavorite;
    this.addressForm.get("isFavorite")?.setValue(this.address.isFavorite);
  }

  onSubmit() {
    this.addressChanged.emit(this.addressForm.value);
    this.addressEditFlag = !this.addressEditFlag;
  }
  public noWhitespaceValidator(control: FormControl) {
    if (control.pristine || !control.touched) {
      return null;
    }
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
