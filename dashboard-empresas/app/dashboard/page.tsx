'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from "next/link";

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const stats = [
        { title: 'Receita Total', value: 'R$ 128.900', change: '+12%' },
        { title: 'Pedidos', value: '1.284', change: '+8%' },
        { title: 'Clientes', value: '842', change: '+4%' },
        { title: 'Conversão', value: '6.8%', change: '+2%' },
    ];

    const vendas = [
        { produto: 'Notebook Pro', quantidade: 42, valor: 'R$ 84.000' },
        { produto: 'Mouse Wireless', quantidade: 88, valor: 'R$ 13.200' },
        { produto: 'Teclado Mecânico', quantidade: 37, valor: 'R$ 18.500' },
        { produto: 'Monitor UltraWide', quantidade: 19, valor: 'R$ 38.000' },
    ];
    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Overlay Mobile */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/70 z-40 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-50 h-screen w-72
          border-r border-white/10 bg-zinc-950 p-6
          flex flex-col justify-between
          transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:flex
        `}
            >
                <div>
                    {/* Mobile Close */}
                    <div className="flex items-center justify-between lg:hidden mb-8">
                        <h1 className="text-2xl font-bold">Menu</h1>

                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
                        >
                            <X size={22} />
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Dashboard
                        </h1>

                        <p className="text-zinc-400 mt-2 text-sm">
                            Painel administrativo moderno
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-3">
                        <nav className="space-y-3">
                            <SidebarItem
                                label="Produtos"
                                href="/dashboard/produtos"
                                active
                            />
                        </nav>
                    </nav>
                </div>

                {/* Footer */}
                <div className="border border-white/10 rounded-2xl p-4 bg-white/5 backdrop-blur">
                    <p className="text-sm text-zinc-400">
                        Status do sistema
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />

                        <span className="text-sm">
                            Operando normalmente
                        </span>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto w-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8 lg:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-3 rounded-2xl border border-white/10 bg-zinc-950 hover:bg-white/10 transition"
                    >
                        <Menu size={24} />
                    </button>

                    <h2 className="text-xl font-bold">
                        Dashboard
                    </h2>
                </div>

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                            Visão Geral
                        </h2>

                        <p className="text-zinc-400 mt-1 text-sm sm:text-base">
                            Acompanhe métricas e desempenho em tempo real.
                        </p>
                    </div>

                    <button className="px-5 py-3 rounded-2xl border border-white/10 bg-white text-black font-medium hover:scale-[1.02] transition-transform cursor-pointer">
                        Exportar Relatório
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    {stats.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <span className="text-zinc-400 text-sm">
                                    {item.title}
                                </span>

                                <span className="text-xs border border-white/10 px-2 py-1 rounded-full text-zinc-300">
                                    {item.change}
                                </span>
                            </div>

                            <h3 className="text-3xl font-bold">
                                {item.value}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Chart */}
                    <section className="xl:col-span-2 rounded-3xl border border-white/10 bg-zinc-950 p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <div>
                                <h3 className="text-xl font-semibold">
                                    Performance de Vendas
                                </h3>

                                <p className="text-zinc-400 text-sm mt-1">
                                    Últimos 30 dias
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button className="px-3 py-2 rounded-xl bg-white text-black text-sm font-medium cursor-pointer">
                                    Mensal
                                </button>

                                <button className="px-3 py-2 rounded-xl border border-white/10 text-sm text-zinc-300 hover:bg-white/10 transition cursor-pointer">
                                    Semanal
                                </button>
                            </div>
                        </div>

                        <div className="h-[250px] sm:h-[320px] rounded-2xl border border-dashed border-white/10 flex items-center justify-center bg-black">
                            <div className="w-full px-4 sm:px-10 flex items-end gap-3 sm:gap-4 h-full py-8 sm:py-10">
                                {[35, 60, 48, 75, 92, 55, 80].map(
                                    (height, index) => (
                                        <div
                                            key={index}
                                            className="flex-1 bg-white rounded-t-2xl transition-all duration-500 hover:opacity-80"
                                            style={{ height: `${height}%` }}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Activities */}
                    <section className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold">
                                Atividades
                            </h3>

                            <p className="text-zinc-400 text-sm mt-1">
                                Atualizações recentes
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                'Novo produto cadastrado',
                                'Venda concluída',
                                'Novo colaborador adicionado',
                                'Estoque atualizado',
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 border border-white/5 rounded-2xl p-4 bg-black hover:bg-white/5 transition"
                                >
                                    <div className="w-2 h-2 rounded-full bg-white mt-2" />

                                    <div>
                                        <p className="font-medium">
                                            {item}
                                        </p>

                                        <span className="text-xs text-zinc-500">
                                            Há {index + 1} hora(s)
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Table */}
                <section className="mt-8 rounded-3xl border border-white/10 bg-zinc-950 p-4 sm:p-6 overflow-hidden">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                        <div>
                            <h3 className="text-xl font-semibold">
                                Últimas Vendas
                            </h3>

                            <p className="text-zinc-400 text-sm mt-1">
                                Produtos vendidos recentemente
                            </p>
                        </div>

                        <input
                            placeholder="Buscar..."
                            className="bg-black border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-white transition-colors w-full lg:w-[300px]"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse min-w-[600px]">
                            <thead>
                                <tr className="text-left border-b border-white/10 text-zinc-400 text-sm">
                                    <th className="pb-4 font-medium">
                                        Produto
                                    </th>

                                    <th className="pb-4 font-medium">
                                        Quantidade
                                    </th>

                                    <th className="pb-4 font-medium">
                                        Valor
                                    </th>

                                    <th className="pb-4 font-medium">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {vendas.map((item) => (
                                    <tr
                                        key={item.produto}
                                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                    >
                                        <td className="py-5 font-medium">
                                            {item.produto}
                                        </td>

                                        <td className="py-5 text-zinc-300">
                                            {item.quantidade}
                                        </td>

                                        <td className="py-5 text-zinc-300">
                                            {item.valor}
                                        </td>

                                        <td className="py-5">
                                            <span className="px-3 py-1 rounded-full bg-white text-black text-xs font-semibold">
                                                Concluído
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}

function SidebarItem({
    label,
    href,
    active = false,
}: {
    label: string;
    href: string;
    active?: boolean;
}) {
    return (
        <Link
            href={href}
            className={`
        w-full flex items-center justify-between
        px-5 py-4 rounded-2xl
        cursor-pointer
        transition-all duration-300
        hover:scale-[1.02]
        hover:shadow-2xl
        hover:shadow-white/10
        hover:-translate-y-0.5
        ${active
                    ? "bg-white text-black font-semibold"
                    : "bg-white/5 hover:bg-white/10 text-white"
                }
      `}
        >
            <span>{label}</span>
            <span>→</span>
        </Link>
    );
}