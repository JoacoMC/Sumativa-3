import { useState } from 'react';
import { useEffect } from 'react';
import Post from './post';



export default function App() {
    const [arrFichas, setArrFichas] = useState(() => {
        const fichasGuardadas = localStorage.getItem("fichas");
        return fichasGuardadas ? JSON.parse(fichasGuardadas) : [];
    });
    useEffect(() => {
        localStorage.setItem("fichas", JSON.stringify(arrFichas));
    }, [arrFichas]);

    const agregarFichas = (nuevo) => {
        setArrFichas([...arrFichas, nuevo]);
    };

    const enviar = (event) => {
        event.preventDefault();
        const titulo = document.getElementById("titulo").value;
        const descripcion = document.getElementById("descripcion").value;
        const importancia = document.getElementById("importancia").checked ? "on" : "off";
        const nuevo = {
            id: Date.now(),
            titulo,
            descripcion,
            importancia
        };
        agregarFichas(nuevo);

        event.target.reset();
    };

    

    const eliminarFicha = (id) => {
        setArrFichas(arrFichas.filter(ficha => ficha.id !== id));
    };

  return (
    <div>
        <div>
            <form onSubmit={enviar} className="bg-light p-4 rounded shadow-sm">
                <div className="row mb-3 align-items-center">
                    <label htmlFor="titulo" className="col-sm-2 col-form-label fw-semibold">Título</label>
                    <div className="col-sm-10">
                    <input type="text" className="form-control" id="titulo" placeholder="..." />
                    </div>
                </div>
                <div className="row mb-3 align-items-center">
                    <label htmlFor="descripcion" className="col-sm-2 col-form-label fw-semibold">Descripción</label>
                    <div className="col-sm-10">
                    <input type="text" className="form-control" id="descripcion" placeholder="..." required />
                    </div>
                </div>
                <div className="row mb-3 align-items-center">
                    <label htmlFor="importancia" className="col-sm-2 col-form-label fw-semibold">Importante</label>
                    <div className="col-sm-10">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="importancia" role="switch" />
                    </div>
                    </div>
                </div>
                <div className="row mb-3 align-items-center">
                    <label className="col-sm-2"></label>
                    <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary px-4">Ingresar nota</button>
                    </div>
                </div>
            </form>
        </div>
        <div>
            <div className="notes">
                {arrFichas.map((ficha) => (
                    <div key={ficha.id} className="note-item">
                        <Post
                            titulo={ficha.titulo}
                            descripcion={ficha.descripcion}
                            importancia={ficha.importancia}
                            onDelete={() => eliminarFicha(ficha.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}


