-- Apartments table
CREATE TABLE IF NOT EXISTS apartments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_fr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  price_per_night DECIMAL(10,2) NOT NULL,
  max_guests INTEGER NOT NULL DEFAULT 2,
  bedrooms INTEGER NOT NULL DEFAULT 1,
  bathrooms INTEGER NOT NULL DEFAULT 1,
  area_sqm INTEGER DEFAULT 50,
  location TEXT NOT NULL DEFAULT 'Sardaigne',
  amenities TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Packs table
CREATE TABLE IF NOT EXISTS packs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_fr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  price_per_person DECIMAL(10,2) NOT NULL,
  duration_days INTEGER NOT NULL DEFAULT 1,
  max_persons INTEGER NOT NULL DEFAULT 8,
  includes_fr TEXT[] DEFAULT '{}',
  includes_en TEXT[] DEFAULT '{}',
  highlights_fr TEXT[] DEFAULT '{}',
  highlights_en TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  category TEXT DEFAULT 'combo' CHECK (category IN ('boat', 'quad', 'forest', 'combo')),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_type TEXT NOT NULL CHECK (booking_type IN ('apartment', 'pack')),
  item_id UUID NOT NULL,
  item_title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  guests INTEGER NOT NULL DEFAULT 1,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blocked dates table
CREATE TABLE IF NOT EXISTS blocked_dates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id UUID NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('apartment', 'pack')),
  blocked_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE apartments ENABLE ROW LEVEL SECURITY;
ALTER TABLE packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read apartments" ON apartments FOR SELECT USING (true);
CREATE POLICY "Public read packs" ON packs FOR SELECT USING (true);
CREATE POLICY "Public read blocked_dates" ON blocked_dates FOR SELECT USING (true);

-- Allow public to insert bookings
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read bookings" ON bookings FOR SELECT USING (true);

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('sky-travel-images', 'sky-travel-images', true) ON CONFLICT DO NOTHING;

CREATE POLICY "Public read images" ON storage.objects FOR SELECT USING (bucket_id = 'sky-travel-images');
CREATE POLICY "Public upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'sky-travel-images');
CREATE POLICY "Public update images" ON storage.objects FOR UPDATE USING (bucket_id = 'sky-travel-images');
CREATE POLICY "Public delete images" ON storage.objects FOR DELETE USING (bucket_id = 'sky-travel-images');

-- Seed data: Apartments
INSERT INTO apartments (title_fr, title_en, description_fr, description_en, price_per_night, max_guests, bedrooms, bathrooms, area_sqm, location, amenities, images, featured) VALUES
(
  'Villa Azzurra – Vue mer panoramique',
  'Villa Azzurra – Panoramic sea view',
  'Magnifique villa avec une vue imprenable sur la mer Tyrrhénienne. Entièrement rénovée avec des matériaux nobles, elle offre un cadre idyllique pour des vacances mémorables en Sardaigne. La piscine à débordement vous plongera dans un état de relaxation absolue.',
  'Magnificent villa with breathtaking views over the Tyrrhenian Sea. Fully renovated with noble materials, it offers an idyllic setting for unforgettable holidays in Sardinia. The infinity pool will immerse you in absolute relaxation.',
  280, 8, 4, 2, 180, 'Costa Smeralda, Sardaigne',
  ARRAY['Piscine', 'Vue mer', 'WiFi', 'Climatisation', 'Cuisine équipée', 'Terrasse', 'Parking', 'BBQ'],
  ARRAY['https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800', 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800', 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800'],
  true
),
(
  'Appartement Nuraghe – Cœur de village',
  'Appartement Nuraghe – Village heart',
  'Charmant appartement authentique situé au cœur d''un village sarde traditionnel. Décoré dans le respect de l''architecture locale, il vous transportera dans l''âme de la Sardaigne. À deux pas des restaurants et boutiques locales.',
  'Charming authentic apartment located in the heart of a traditional Sardinian village. Decorated in keeping with local architecture, it will transport you to the soul of Sardinia. Steps away from local restaurants and shops.',
  120, 4, 2, 1, 75, 'Alghero, Sardaigne',
  ARRAY['WiFi', 'Climatisation', 'Cuisine équipée', 'Balcon', 'Centre-ville'],
  ARRAY['https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
  true
),
(
  'Maison Capo Testa – Pointe sauvage',
  'Maison Capo Testa – Wild cape',
  'Maison de charme perchée sur les rochers granitiques de Capo Testa. Un endroit magique au bout du monde, entouré d''une nature préservée et de criques secrètes accessibles à pied. L''idéale pour les amoureux de nature et de randonnée.',
  'Charming house perched on the granite rocks of Capo Testa. A magical place at the end of the world, surrounded by preserved nature and secret coves accessible on foot. Perfect for nature and hiking lovers.',
  165, 6, 3, 2, 110, 'Capo Testa, Sardaigne',
  ARRAY['Vue mer', 'WiFi', 'Cuisine équipée', 'Terrasse', 'Accès plage', 'Nature préservée'],
  ARRAY['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800'],
  true
),
(
  'Suite Corallo – Plage privée',
  'Suite Corallo – Private beach',
  'Suite de luxe avec accès direct à une plage privée de sable blanc et eau cristalline. Service de conciergerie inclus, petit-déjeuner livré chaque matin. Un hôtel particulier pour deux, l''intimité absolue garantie.',
  'Luxury suite with direct access to a private white sand beach and crystal clear water. Concierge service included, breakfast delivered each morning. A private mansion for two, absolute intimacy guaranteed.',
  350, 2, 1, 1, 60, 'Villasimius, Sardaigne',
  ARRAY['Plage privée', 'Petit-déjeuner', 'WiFi', 'Climatisation', 'Service conciergerie', 'Jacuzzi'],
  ARRAY['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800'],
  false
),
(
  'Appartement Myrte – Calm et nature',
  'Appartement Myrte – Calm and nature',
  'Appartement lumineux en pleine nature, entouré de végétation méditerranéenne et de parfums de myrte. Idéal pour se ressourcer loin de l''agitation. À 5 minutes à pied de la plage de Piscinas, la plus sauvage de Sardaigne.',
  'Bright apartment in the heart of nature, surrounded by Mediterranean vegetation and the scents of myrtle. Perfect for recharging far from the hustle. A 5-minute walk from Piscinas beach, the most wild in Sardinia.',
  140, 4, 2, 1, 80, 'Piscinas, Sardaigne',
  ARRAY['WiFi', 'Climatisation', 'Cuisine équipée', 'Jardin', 'Proche plage', 'Nature'],
  ARRAY['https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800', 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'],
  false
),
(
  'Penthouse Gallura – Toit du monde',
  'Penthouse Gallura – Rooftop of the world',
  'Penthouse d''exception au dernier étage avec terrasse panoramique à 360°. Vue imprenable sur les îles de l''archipel de la Maddalena et le détroit de Bonifacio. Architecture contemporaine mariant luxe et authenticité sarde.',
  'Exceptional penthouse on the top floor with 360° panoramic terrace. Breathtaking views over the La Maddalena archipelago and the Bonifacio strait. Contemporary architecture combining luxury and Sardinian authenticity.',
  420, 6, 3, 2, 150, 'Palau, Sardaigne',
  ARRAY['Vue panoramique', 'Terrasse 360°', 'WiFi', 'Climatisation', 'Cuisine haut de gamme', 'Parking', 'Sécurité'],
  ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
  false
),
(
  'Bergerie Ogliastra – Authenticité pure',
  'Bergerie Ogliastra – Pure authenticity',
  'Ancienne bergerie réhabilitée avec goût au cœur de l''Ogliastra, région sauvage classée patrimoine mondial. Pierres apparentes, voûtes traditionnelles et jardin arboré créent une atmosphère unique hors du temps. Idéal pour découvrir la vraie Sardaigne.',
  'Former shepherd''s cottage tastefully converted in the heart of Ogliastra, a wild region classified as a World Heritage site. Exposed stone, traditional vaults and a tree-lined garden create a unique timeless atmosphere. Perfect for discovering the real Sardinia.',
  195, 6, 3, 2, 130, 'Ogliastra, Sardaigne',
  ARRAY['Jardin', 'BBQ', 'WiFi', 'Cuisine équipée', 'Cheminée', 'Randonnées', 'Calme total'],
  ARRAY['https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800', 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800'],
  true
);

-- Seed data: Packs
INSERT INTO packs (title_fr, title_en, description_fr, description_en, price_per_person, duration_days, max_persons, includes_fr, includes_en, highlights_fr, highlights_en, images, category, featured) VALUES
(
  'Sortie en Bateau – Calanques & Grottes',
  'Boat Trip – Calanques & Caves',
  'Embarquez pour une journée inoubliable en mer avec notre guide-marin expérimenté. Découverte des plus belles calanques de la côte est, plongée en apnée dans les eaux cristallines et visite des grottes marines secrètes inaccessibles par la terre.',
  'Embark on an unforgettable day at sea with our experienced marine guide. Discover the most beautiful calanques on the east coast, snorkelling in crystal clear waters and visiting secret sea caves inaccessible by land.',
  85, 1, 10,
  ARRAY['Embarquement privé (10 pers. max)', 'Équipement snorkeling', 'Déjeuner à bord (fruits, fromages locaux)', 'Guide professionnel bilingue', 'Gilets de sauvetage', 'Photos souvenir'],
  ARRAY['Private boarding (max 10 pers.)', 'Snorkeling equipment', 'On-board lunch (local fruits & cheeses)', 'Professional bilingual guide', 'Life jackets', 'Souvenir photos'],
  ARRAY['Calanques secrètes', 'Grottes marines', 'Snorkeling', 'Déjeuner à bord'],
  ARRAY['Secret calanques', 'Sea caves', 'Snorkeling', 'On-board lunch'],
  ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800'],
  'boat', true
),
(
  'Excursion en Quad – Maquis & Plages',
  'Quad Excursion – Maquis & Beaches',
  'Partez à la conquête des pistes secrètes de Sardaigne à bord de quads tout-terrain. Traversée du maquis méditerranéen parfumé, découverte de plages sauvages inaccessibles en voiture. Une aventure adrénaline dans un décor à couper le souffle.',
  'Set off to conquer Sardinia''s secret tracks on all-terrain quads. Cross the fragrant Mediterranean maquis, discover wild beaches inaccessible by car. An adrenaline adventure in a breathtaking setting.',
  110, 1, 8,
  ARRAY['Quad tout-terrain fourni', 'Casque et équipement de protection', 'Guide accompagnateur expert', 'Assurance incluse', 'Eau et snacks énergétiques', 'Arrêts baignade'],
  ARRAY['All-terrain quad provided', 'Helmet and protective gear', 'Expert accompanying guide', 'Insurance included', 'Water and energy snacks', 'Swimming stops'],
  ARRAY['Pistes secrètes', 'Plages sauvages', 'Maquis méditerranéen', 'Vue panoramique'],
  ARRAY['Secret trails', 'Wild beaches', 'Mediterranean maquis', 'Panoramic views'],
  ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
  'quad', true
),
(
  'Nuit en Forêt – Casa sull''Albero',
  'Forest Night – Casa sull''Albero',
  'Vivez une expérience unique et poétique dans notre maison atypique perchée dans les chênes-lièges centenaires de la forêt de Sette Fratelli. Nuit étoilée, chants des cigales, petit-déjeuner sarde au lever du soleil. Une parenthèse enchantée hors du temps.',
  'Live a unique and poetic experience in our atypical house perched in the century-old cork oaks of the Sette Fratelli forest. Starry night, cicada songs, Sardinian breakfast at sunrise. An enchanted pause outside of time.',
  145, 1, 4,
  ARRAY['Nuit en cabane arboricole exclusive', 'Petit-déjeuner sarde traditionnel', 'Apéritif de bienvenue', 'Accès hamacs et espace détente forêt', 'Observation astronomique (carte étoiles)', 'Lampes frontales fournies'],
  ARRAY['Night in exclusive treehouse', 'Traditional Sardinian breakfast', 'Welcome aperitif', 'Hammock access and forest relaxation area', 'Astronomical observation (star map)', 'Head torches provided'],
  ARRAY['Cabane dans les arbres', 'Nuit sous les étoiles', 'Petit-déjeuner sarde', 'Forêt de Sette Fratelli'],
  ARRAY['Treehouse cabin', 'Night under the stars', 'Sardinian breakfast', 'Sette Fratelli forest'],
  ARRAY['https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800'],
  'forest', true
),
(
  'Pack Découverte Total – 3 Expériences',
  'Total Discovery Pack – 3 Experiences',
  'Le pack ultime pour découvrir la Sardaigne sous toutes ses facettes ! Trois jours d''aventure combinant la sortie en mer, l''excursion en quad et la nuit magique en forêt. Une immersion totale dans l''âme de l''île.',
  'The ultimate pack to discover Sardinia in all its facets! Three days of adventure combining the sea trip, quad excursion and magical forest night. A total immersion into the soul of the island.',
  280, 3, 8,
  ARRAY['Sortie bateau complète (J1)', 'Excursion quad demi-journée (J2)', 'Nuit en forêt + petit-déjeuner (J2-J3)', 'Transferts entre activités', 'Guide francophone dédié', 'Assurances toutes activités'],
  ARRAY['Full boat trip (Day 1)', 'Half-day quad excursion (Day 2)', 'Forest night + breakfast (Day 2-3)', 'Transfers between activities', 'Dedicated French-speaking guide', 'All-activity insurance'],
  ARRAY['3 expériences en 3 jours', 'Guide dédié francophone', 'Transferts inclus', 'Tarif préférentiel pack'],
  ARRAY['3 experiences in 3 days', 'Dedicated French-speaking guide', 'Transfers included', 'Preferential pack rate'],
  ARRAY['https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800', 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800'],
  'combo', true
);
