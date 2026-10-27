import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  PackagePlus, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Boxes, 
  Tag, 
  DollarSign, 
  FileText 
} from "lucide-react";

interface Producto {
  codigo: string;
  descripcion: string;
  precio: number;
  categoria: string;
}

const productosIniciales: Producto[] = [
  { codigo: "P001", descripcion: "Laptop Pro 15", precio: 1200.5, categoria: "Electrónica" },
  { codigo: "P002", descripcion: "Teclado Mecánico", precio: 85.0, categoria: "Accesorios" },
  { codigo: "P003", descripcion: "Monitor 4K 27", precio: 350.0, categoria: "Electrónica" },
  { codigo: "P004", descripcion: "Silla Ergonómica", precio: 199.99, categoria: "Mobiliario" },
  { codigo: "P005", descripcion: "Ratón Inalámbrico", precio: 45.0, categoria: "Accesorios" },
];

export default function App() {
  const [productos, setProductos] = useState<Producto[]>(productosIniciales);
  
  const [formulario, setFormulario] = useState({
    descripcion: "",
    precio: "",
    categoria: "",
  });

  const [errores, setErrores] = useState({
    descripcion: "",
    precio: "",
    categoria: "",
  });

  const [mensajeExito, setMensajeExito] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
    setErrores({ ...errores, [name]: "" });
    setMensajeExito("");
  };

  const limpiarFormulario = () => {
    setFormulario({ descripcion: "", precio: "", categoria: "" });
    setErrores({ descripcion: "", precio: "", categoria: "" });
    setMensajeExito("");
  };

  const registrarProducto = (e: React.FormEvent) => {
    e.preventDefault();
    let valido = true;
    const nuevosErrores = { descripcion: "", precio: "", categoria: "" };

    if (formulario.descripcion.trim().length < 3) {
      nuevosErrores.descripcion = "La descripción debe tener al menos 3 caracteres.";
      valido = false;
    }
    
    const precioNum = parseFloat(formulario.precio);
    if (!formulario.precio || isNaN(precioNum) || precioNum <= 0) {
      nuevosErrores.precio = "El precio debe ser un número positivo mayor a 0.";
      valido = false;
    }

    if (formulario.categoria.trim() === "") {
      nuevosErrores.categoria = "La categoría es obligatoria.";
      valido = false;
    }

    if (!valido) {
      setErrores(nuevosErrores);
      return;
    }

    const nuevoCodigo = `P${Math.floor(1000 + Math.random() * 9000)}`;

    const nuevoProducto: Producto = {
      codigo: nuevoCodigo,
      descripcion: formulario.descripcion.trim(),
      precio: precioNum,
      categoria: formulario.categoria.trim(),
    };

    setProductos([nuevoProducto, ...productos]);
    limpiarFormulario();
    setMensajeExito("Producto agregado correctamente al catálogo.");
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Fondo con degradado sutil */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
        
        {/* Cabecera */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/[0.08] pb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Boxes className="w-3.5 h-3.5" />
              Inventario Interno
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Gestión de productos
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-1">
              Consulta y registra ítems en tiempo real para el catálogo comercial.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-slate-800/80 border border-slate-700/80 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
              Total activos: <strong className="text-white">{productos.length}</strong>
            </span>
          </div>
        </header>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Formulario (4 Columnas) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <Card className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-white/[0.06] bg-slate-900/40 pb-5">
                <CardTitle className="text-lg font-semibold flex items-center gap-2 text-white">
                  <PackagePlus className="w-5 h-5 text-indigo-400" />
                  Nuevo Producto
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Ingresa los detalles para registrar un ítem en memoria.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <form onSubmit={registrarProducto} className="space-y-5">
                  
                  {/* Input Descripción */}
                  <div className="space-y-1.5">
                    <Label htmlFor="descripcion" className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      Descripción
                    </Label>
                    <Input
                      id="descripcion"
                      name="descripcion"
                      placeholder="Ej. Teclado Mecánico RGB"
                      value={formulario.descripcion}
                      onChange={handleChange}
                      className="bg-slate-950/60 border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm placeholder:text-slate-600 transition-all text-white"
                    />
                    {errores.descripcion && (
                      <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errores.descripcion}
                      </p>
                    )}
                  </div>

                  {/* Input Precio */}
                  <div className="space-y-1.5">
                    <Label htmlFor="precio" className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                      Precio de venta ($)
                    </Label>
                    <Input
                      id="precio"
                      name="precio"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formulario.precio}
                      onChange={handleChange}
                      className="bg-slate-950/60 border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm placeholder:text-slate-600 transition-all text-white"
                    />
                    {errores.precio && (
                      <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errores.precio}
                      </p>
                    )}
                  </div>

                  {/* Input Categoría */}
                  <div className="space-y-1.5">
                    <Label htmlFor="categoria" className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-slate-400" />
                      Categoría
                    </Label>
                    <Input
                      id="categoria"
                      name="categoria"
                      placeholder="Ej. Accesorios, Tecnología"
                      value={formulario.categoria}
                      onChange={handleChange}
                      className="bg-slate-950/60 border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm placeholder:text-slate-600 transition-all text-white"
                    />
                    {errores.categoria && (
                      <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errores.categoria}
                      </p>
                    )}
                  </div>

                  {/* Mensaje de Confirmación */}
                  {mensajeExito && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{mensajeExito}</span>
                    </div>
                  )}

                  {/* Botones de acción */}
                  <div className="flex gap-3 pt-3">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]"
                    >
                      Registrar producto
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/10 bg-slate-950/40 hover:bg-white/[0.06] text-slate-300 rounded-xl transition-all"
                      onClick={limpiarFormulario}
                    >
                      <RotateCcw className="w-4 h-4 mr-1 text-slate-400" />
                      Limpiar
                    </Button>
                  </div>

                </form>
              </CardContent>
            </Card>
          </div>

          {/* Listado de Productos (Tabla - 7/8 Columnas) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <Card className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-white/[0.06] bg-slate-900/40 pb-5">
                <CardTitle className="text-lg font-semibold flex items-center justify-between text-white">
                  <span>Catálogo Actual</span>
                  <span className="text-xs font-normal text-slate-400">
                    Mostrando {productos.length} registros
                  </span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-950/60 border-b border-white/[0.06]">
                      <TableRow className="border-white/[0.06] hover:bg-transparent">
                        <TableHead className="w-[120px] text-xs font-bold uppercase tracking-wider text-slate-400 py-3.5 pl-6">
                          Código
                        </TableHead>
                        <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Descripción
                        </TableHead>
                        <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Categoría
                        </TableHead>
                        <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-slate-400 pr-6">
                          Precio
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-white/[0.04]">
                      {productos.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-12 text-slate-500 text-sm">
                            No hay productos en el catálogo.
                          </TableCell>
                        </TableRow>
                      ) : (
                        productos.map((producto) => (
                          <TableRow 
                            key={producto.codigo} 
                            className="border-white/[0.04] hover:bg-white/[0.03] transition-colors group"
                          >
                            <TableCell className="font-mono text-xs font-semibold text-indigo-400 pl-6">
                              {producto.codigo}
                            </TableCell>
                            <TableCell className="text-sm font-medium text-slate-200">
                              {producto.descripcion}
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-white/[0.06]">
                                {producto.categoria}
                              </span>
                            </TableCell>
                            <TableCell className="text-right text-sm font-semibold text-emerald-400 pr-6 font-mono">
                              ${producto.precio.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}