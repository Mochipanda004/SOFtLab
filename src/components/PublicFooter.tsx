export default function PublicFooter() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-gray-500">
        © {new Date().getFullYear()} Melody Labs · Todos los derechos reservados
      </div>
    </footer>
  );
}

