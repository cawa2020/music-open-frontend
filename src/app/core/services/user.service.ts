import { computed, Injectable, signal, Signal } from '@angular/core';
import { User } from '../../shared/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly user = signal<User | null>(null)

  public select<Key extends keyof User>(key: Key): Signal<User[Key] | []> {
    return computed(() => {
      const user = this.user()
      if (!user) return []
      return user[key]
    });
  }

  setUser(newUser: User): void {
    this.user.set(newUser);
  }

  updateUser(newUser: User): void {
    const user = this.user()
    this.user.set({ ...user, ...newUser })
  }
}
