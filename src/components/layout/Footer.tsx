export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm">
            © 2024 BlogApp. Built with Next.js and Supabase.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
              Privacy
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
