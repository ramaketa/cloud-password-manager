import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {Observable} from "rxjs";
import {Note} from "../models/note.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  register(user: User): Observable<any> {
    return this.httpClient.post<any>('/api/auth/registry', user);
  }

  createNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>('/note', note);
  }

  updateNote(note: Note): Observable<Note> {
    return this.httpClient.patch<Note>('/note', note);
  }

    deleteNote(noteId: number | undefined): Observable<any> {
    return this.httpClient.delete<any>('/note', {
      body: { noteId }
    });
  }

  getNote(noteId: number): Observable<Note> {
    return this.httpClient.get<Note>(`/note/${noteId}`);
  }

  getNoteList(): Observable<Note[]> {
    return this.httpClient.get<Note[]>('/note/all');
  }
}
