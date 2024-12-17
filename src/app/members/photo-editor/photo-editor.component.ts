import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { Member } from 'src/app/Models/member';
import { Photo } from 'src/app/Models/photo';
import { user } from 'src/app/Models/User';
import { AccountService } from 'src/app/Services/account.service';
import { MembersService } from 'src/app/Services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
@Input() member: Member | undefined
uploader: FileUploader | undefined
hasBaseDropzoneOver = false
baseUrl = environment.baseUrl
user : user | undefined
constructor(private accountService : AccountService, private memberService: MembersService){
  this.accountService.currentUser.pipe(take(1)).subscribe({
    next:user => 
      { 
        if(user) this.user = user
      }
  })
}
ngOnInit(): void {
  this.initialUploader()
}

fileOverBase(e: any){
  this.hasBaseDropzoneOver = e
}
deletePhoto(photoId: number)
{
  this.memberService.deletePhoto(photoId).subscribe({
    next: _ => {
      if(this.member)
      {
        this.member.photos = this.member.photos.filter(x => x.id !== photoId)
      }
    }
  })
}
setMainPhoto(photo: Photo)
{
  return this.memberService.setMainPhoto(photo.id).subscribe({
    next :  () => {
      if(this.user && this.member)
      {
        this.user.photoUrl = photo.url
        this.accountService.setCurrentUser(this.user)
        this.member.photoUrl = photo.url
        this.member.photos.forEach(p => {
          if(p.isMain) p.isMain = false
          if(p.id == photo.id) p.isMain = true
        })
      }
    }
  })
}
initialUploader(){
  
  this.uploader = new FileUploader({
  url: this.baseUrl + "users/add-photo",
  authToken: "Bearer " + this.user?.token,
  isHTML5: true,
  allowedMimeType : ['image/jpeg', 'image/png'],
  removeAfterUpload: true,
  autoUpload: false,
  maxFileSize: 10 * 1024 * 1024

  });
  this.uploader.onAfterAddingFile = (file) => {
                file.withCredentials = false
  }
  this.uploader.onSuccessItem = (item, response, status, headers) => {
    if(response){
       const photo = JSON.parse(response)
       this.member?.photos.push(photo)
       if( photo.isMain &&this.user && this.member){
this.user.photoUrl = photo.url
this.member.photoUrl = photo.url
this.accountService.setCurrentUser(this.user)
       }
    }
  }
}
}
