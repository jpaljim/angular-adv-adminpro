import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { delay, Subscription } from 'rxjs';

import { Hospital } from '../../../models/hospital.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarHospitales());
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarHospitales();
    }

    this.busquedasService
      .buscar('hospitales', termino)
      .subscribe((resultados) => {
        this.hospitales = resultados;
      });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe((hospitales) => {
      this.cargando = false;
      this.hospitales = hospitales;
    });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService
      .actualizarHospital(hospital._id, hospital.nombre)
      .subscribe({
        next: (resp) => {
          Swal.fire('Actualizado', hospital.nombre, 'success');
        },
      });
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital._id).subscribe({
      next: (resp) => {
        this.cargarHospitales();
        Swal.fire('Borrado', hospital.nombre, 'success');
      },
    });
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      input: 'text',
      inputPlaceholder: 'Introduce el nombre',
      showCancelButton: true,
      title: 'Crear hospital',
    });

    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value).subscribe({
        next: (resp: any) => {
          this.hospitales.push(resp.hospital);
          Swal.fire('Creado', resp.nombre, 'success');
        },
      });
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal(
      'hospitales',
      hospital._id,
      hospital.img
    );
  }
}
