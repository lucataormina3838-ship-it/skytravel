import { getTranslations } from 'next-intl/server';
import { Mail, Phone, Clock, MapPin, Send } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === 'fr' ? 'Sky Travel – Nous contacter' : 'Sky Travel – Contact us',
    description: locale === 'fr'
      ? 'Contactez l\'équipe Sky Travel pour toute question sur vos séjours en Sardaigne.'
      : 'Contact the Sky Travel team for any questions about your stays in Sardinia.',
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === 'fr';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 to-sky-900 pt-32 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-sky-300 font-semibold text-sm uppercase tracking-wider mb-3">Sky Travel</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {isFr ? 'Nous contacter' : 'Contact us'}
          </h1>
          <p className="text-slate-300 text-lg">
            {isFr
              ? 'Notre équipe francophone répond sous 24h'
              : 'Our French-speaking team replies within 24 hours'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Infos contact */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              {isFr ? 'Informations de contact' : 'Contact information'}
            </h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{isFr ? 'Email' : 'Email'}</p>
                  <a href="mailto:skytravel.sardegna@gmail.com" className="text-sky-600 hover:underline">
                    skytravel.sardegna@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{isFr ? 'Téléphone / WhatsApp' : 'Phone / WhatsApp'}</p>
                  <a href="tel:+33770018291" className="text-sky-600 hover:underline">+33 7 70 01 82 91</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{isFr ? 'Horaires' : 'Opening hours'}</p>
                  <p className="text-slate-600 text-sm">{isFr ? 'Lun – Ven : 9h – 19h' : 'Mon – Fri: 9am – 7pm'}</p>
                  <p className="text-slate-600 text-sm">{isFr ? 'Sam : 10h – 17h' : 'Sat: 10am – 5pm'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{isFr ? 'Basé en' : 'Based in'}</p>
                  <p className="text-slate-600 text-sm">France · {isFr ? 'Séjours en Sardaigne' : 'Stays in Sardinia'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/33770018291"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-4 rounded-2xl transition-colors w-fit shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.524 5.847L0 24l6.303-1.504A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.004-1.366l-.36-.213-3.736.89.924-3.64-.234-.373A9.77 9.77 0 0 1 2.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
            </svg>
            {isFr ? 'Nous contacter sur WhatsApp' : 'Contact us on WhatsApp'}
          </a>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            {isFr ? 'Envoyez-nous un message' : 'Send us a message'}
          </h2>
          <form action={`mailto:skytravel.sardegna@gmail.com`} method="get" className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {isFr ? 'Prénom' : 'First name'}
                </label>
                <input name="fname" type="text" required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {isFr ? 'Nom' : 'Last name'}
                </label>
                <input name="lname" type="text" required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input name="email" type="email" required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {isFr ? 'Sujet' : 'Subject'}
              </label>
              <select name="subject"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400">
                <option value={isFr ? 'Demande de renseignement' : 'General enquiry'}>
                  {isFr ? 'Demande de renseignement' : 'General enquiry'}
                </option>
                <option value={isFr ? 'Demande de réservation' : 'Booking request'}>
                  {isFr ? 'Demande de réservation' : 'Booking request'}
                </option>
                <option value={isFr ? 'Question sur un bien' : 'Question about a property'}>
                  {isFr ? 'Question sur un bien' : 'Question about a property'}
                </option>
                <option value={isFr ? 'Autre' : 'Other'}>
                  {isFr ? 'Autre' : 'Other'}
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {isFr ? 'Message' : 'Message'}
              </label>
              <textarea name="body" rows={5} required
                placeholder={isFr ? 'Décrivez votre demande...' : 'Describe your request...'}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none" />
            </div>
            <button type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              {isFr ? 'Envoyer le message' : 'Send message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
