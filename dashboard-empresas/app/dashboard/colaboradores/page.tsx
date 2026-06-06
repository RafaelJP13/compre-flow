'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, UserPlus } from 'lucide-react';

export default function NovoColaboradorPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'EMPLOYEE',
  });

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Adicionar Colaborador</h1>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-2 border border-white/10 bg-zinc-900 px-4 py-3 rounded-2xl hover:bg-zinc-800 transition"
          >
            <ArrowLeft size={18} />
            Voltar
          </Link>
        </div>

        <div className="border border-white/10 bg-zinc-950 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-white/10">
              <UserPlus />
            </div>
            <h2 className="text-2xl font-semibold">Dados do colaborador</h2>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Nome</label>
              <input
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-white/30"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">E-mail</label>
              <input
                type="email"
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-white/30"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Função</label>
              <select
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="EMPLOYEE">EMPLOYEE</option>
                <option value="COMPANY_ADMIN">COMPANY_ADMIN</option>
              </select>
            </div>

            <div className="md:col-span-2 flex justify-end pt-4">
              <button
                type="submit"
                className="px-8 py-3 rounded-2xl bg-white text-black font-semibold hover:opacity-90 transition cursor-pointer"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
