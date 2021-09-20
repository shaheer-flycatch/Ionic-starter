import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UsersService } from '../services/users.service';
import { AlertController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
users: any[]=[];
  constructor(private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private userService: UsersService) {}

    ionViewWillEnter(){
      this.getAllUsers();
    }
    async getAllUsers() {
      const loading = await this.loadingController.create();
      await loading.present();
      this.userService.fetchUsers().subscribe(
        async (res) => {
          console.log('result',res);
          await loading.dismiss();
          this.users=res;
        },
        async (res) => {
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'fetching users failed',
            message: res.error.error,
            buttons: ['OK'],
          });
          await alert.present();
        }
      );
    }
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

}
