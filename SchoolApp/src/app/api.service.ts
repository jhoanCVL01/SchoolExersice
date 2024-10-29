import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7235/api'; 

  // ********* Servicios para Estudiantes *********
  getEstudiantes() {
    return axios.get(`${this.baseUrl}/estudiantes`);
  }

  getEstudianteById(id: number) {
    return axios.get(`${this.baseUrl}/estudiantes/${id}`);
  }

  createEstudiante(data: any) {
    return axios.post(`${this.baseUrl}/estudiantes`, data);
  }

  updateEstudiante(id: number, data: any) {
    return axios.put(`${this.baseUrl}/estudiantes/${id}`, data);
  }

  deleteEstudiante(id: number) {
    return axios.delete(`${this.baseUrl}/estudiantes/${id}`);
  }

  // ********* Servicios para Profesores *********
  getProfesores() {
    return axios.get(`${this.baseUrl}/profesores`);
  }

  getProfesorById(id: number) {
    return axios.get(`${this.baseUrl}/profesores/${id}`);
  }

  createProfesor(data: any) {
    return axios.post(`${this.baseUrl}/profesores`, data);
  }

  updateProfesor(id: number, data: any) {
    return axios.put(`${this.baseUrl}/profesores/${id}`, data);
  }

  deleteProfesor(id: number) {
    return axios.delete(`${this.baseUrl}/profesores/${id}`);
  }

  // ********* Servicios para Notas *********
  getNotas() {
    return axios.get(`${this.baseUrl}/notas`);
  }

  getNotaById(id: number) {
    return axios.get(`${this.baseUrl}/notas/${id}`);
  }

  createNota(data: any) {
    return axios.post(`${this.baseUrl}/notas`, data);
  }

  updateNota(id: number, data: any) {
    return axios.put(`${this.baseUrl}/notas/${id}`, data);
  }

  deleteNota(id: number) {
    return axios.delete(`${this.baseUrl}/notas/${id}`);
  }
}
