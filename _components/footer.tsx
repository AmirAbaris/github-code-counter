import {Heart} from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-6 border-t border-gray-100">
      <div
        className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} GitHub Code Counter</p>
        <p className={'inline-flex gap-2 order-2 lg:order-1'}> Made with <Heart className={'text-red-600'}/> by Aba</p>
        <p className="text-sm text-muted-foreground order-1 lg:order-2">Not affiliated with GitHub, Inc.</p>
      </div>
    </footer>
  )
}