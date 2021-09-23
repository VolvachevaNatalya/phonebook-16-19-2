import {Component, OnInit} from '@angular/core';
import {Contact} from "../../model/contact";
import {ActivatedRoute} from "@angular/router";
import {ContactService} from "../../service/contact.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['../contact-details.component.css']
})
export class ContactComponent implements OnInit {
  public contactEditFlag = false;
  public contact: Contact | undefined;
  public contactToDisplay: Contact | undefined;
  public imageSave = "assets/images/save.png";
  public imageEdit = "assets/images/edit.png";

  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.getContact();
  }

  getContact(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const getContactSubscription = this.contactService.getContact(id)
      .subscribe(contact => {
        this.contact = contact;
        this.contactToDisplay = contact;
      });

    this.subscriptions.push(getContactSubscription);
  }

  toggleEditContact() {
    this.contactEditFlag = !this.contactEditFlag;
  }

  updateContact() {
    const updateContactSubscription = this.contactService.updateContact(this.contact)
      .subscribe(_ => {
        this.contactToDisplay = this.contact;
        this.contactEditFlag = !this.contactEditFlag;
      });

    this.subscriptions.push(updateContactSubscription);
  }
}
