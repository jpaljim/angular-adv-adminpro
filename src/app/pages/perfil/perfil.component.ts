import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);

    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe({
      next: (resp) => {
        const { nombre, email } = this.perfilForm.value;
        // al modificarlo aquí, se modifica en todos lados de la web, ya que aunque parezaca que estoy actualizando la propiedad usuario que está localmente, en realidad como en el constructor le hemos asignado el puntero de la propiedad usuario del servicio, en realidad estoy modificando el del servicio también.
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      },
      error: (err) => {
        Swal.fire('Error al actualizar los datos', err.error.msg, 'error');
      },
    });
  }

  cambiarImagen(event) {
    this.imagenSubir = event.target.files[0];

    if (!this.imagenSubir) {
      return (this.imgTemp = null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.imagenSubir);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then((img) => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imágen actualizada correctamente', 'success');
      })
      .catch( err => {
        Swal.fire('Error', 'No se pudo actualizar la imágen', 'error');
      })
  }
}
