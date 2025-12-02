import React from "react";
import {
  Plus,
  Trash2,
  Save,
  Edit,
  RefreshCw,
  Image as ImageIcon,
} from "lucide-react";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

const AdminPanel = ({
  laptops,
  formData,
  setFormData,
  editingId,
  handleAddLaptop,
  handleEdit,
  handleDelete,
  handleResetData,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Dashboard Admin
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Kelola data laptop dan spesifikasi
          </p>
        </div>
        <Button variant="secondary" onClick={handleResetData}>
          <RefreshCw size={18} /> Reset Data Default
        </Button>
      </div>

      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          {editingId ? "Edit Laptop" : "Tambah Laptop Baru"}
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddLaptop();
          }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          <div className="col-span-2 md:col-span-3">
            <Input
              label="Nama Laptop"
              placeholder="Contoh: Laptop Gaming"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <Input
            label="Harga (Rp)"
            type="number"
            placeholder="5000000"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />
          <Input
            label="CPU (Cores)"
            type="number"
            placeholder="4"
            value={formData.cpu}
            onChange={(e) => setFormData({ ...formData, cpu: e.target.value })}
            required
          />
          <Input
            label="RAM (GB)"
            type="number"
            placeholder="8"
            value={formData.ram}
            onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
            required
          />
          <Input
            label="Penyimpanan (GB)"
            type="number"
            placeholder="256"
            value={formData.storage}
            onChange={(e) =>
              setFormData({ ...formData, storage: e.target.value })
            }
            required
          />
          <Input
            label="VRAM (GB)"
            type="number"
            placeholder="0"
            value={formData.vram}
            onChange={(e) => setFormData({ ...formData, vram: e.target.value })}
            required
          />
          <div className="col-span-2 md:col-span-3">
            <Input
              label="URL Gambar (Opsional)"
              placeholder="https://example.com/laptop.jpg"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </div>
          <div className="col-span-2 md:col-span-3 flex justify-end pt-2">
            <Button type="submit" className="w-full justify-center">
              {editingId ? (
                <>
                  <Save size={18} /> Simpan Perubahan
                </>
              ) : (
                <>
                  <Plus size={18} /> Tambah Laptop
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 uppercase font-medium">
            <tr>
              <th className="px-6 py-4">Gambar</th>
              <th className="px-6 py-4">Nama</th>
              <th className="px-6 py-4">Harga</th>
              <th className="px-6 py-4">CPU</th>
              <th className="px-6 py-4">RAM</th>
              <th className="px-6 py-4">Penyimpanan</th>
              <th className="px-6 py-4">VRAM</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white/50 dark:bg-slate-900/50">
            {laptops.map((laptop) => (
              <tr
                key={laptop.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center">
                    {laptop.image ? (
                      <img
                        src={laptop.image}
                        alt={laptop.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon
                        size={20}
                        className="text-slate-400 dark:text-slate-600"
                      />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">
                  {laptop.name}
                </td>
                <td className="px-6 py-4 text-slate-700 dark:text-slate-400">
                  Rp {laptop.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-slate-700 dark:text-slate-400">
                  {laptop.cpu} Cores
                </td>
                <td className="px-6 py-4 text-slate-700 dark:text-slate-400">
                  {laptop.ram} GB
                </td>
                <td className="px-6 py-4 text-slate-700 dark:text-slate-400">
                  {laptop.storage} GB
                </td>
                <td className="px-6 py-4 text-slate-700 dark:text-slate-400">
                  {laptop.vram} GB
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => handleEdit(laptop)}
                      className="px-2 py-1"
                      title="Edit"
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(laptop.id)}
                      className="px-2 py-1"
                      title="Hapus"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
