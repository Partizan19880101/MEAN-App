import { Injectable } from '@angular/core'
import { User } from '../interfaces'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class Authservice {

    constructor(private http: HttpClient) {

    }

    register() {

    }
    
    login(user: User) {

    }
    
}