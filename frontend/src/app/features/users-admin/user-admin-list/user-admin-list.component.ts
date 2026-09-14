import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../core/services/users.service';
import { AdminUser } from '../../../core/models/content.models';

@Component({
  selector: 'app-user-admin-list',
  templateUrl: './user-admin-list.component.html',
  styleUrls: ['./user-admin-list.component.scss'],
})
export class UserAdminListComponent implements OnInit {
  users: AdminUser[] = [];
  loading = true;
  error = '';
  deletingId = '';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.usersService.list().subscribe({
      next: (items) => {
        this.users = items;
        this.loading = false;
      },
      error: () => {
        this.error = 'İstifadəçilər yüklənmədi.';
        this.loading = false;
      },
    });
  }

  remove(user: AdminUser): void {
    if (!user.id || !confirm(`"${user.username}" silinsin?`)) {
      return;
    }
    this.deletingId = user.id;
    this.usersService.delete(user.id).subscribe({
      next: () => {
        this.users = this.users.filter((row) => row.id !== user.id);
        this.deletingId = '';
      },
      error: () => {
        this.error = 'İstifadəçi silinmədi.';
        this.deletingId = '';
      },
    });
  }
}
