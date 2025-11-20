-- Create bookings table for flight reservations
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  pickup_location JSONB NOT NULL, -- {lat, lng, address}
  destination JSONB NOT NULL, -- {lat, lng, address}
  vehicle_tier TEXT NOT NULL CHECK (vehicle_tier IN ('skypod', 'aeroluxe')),
  base_distance DECIMAL(10, 2) NOT NULL,
  route_complexity DECIMAL(3, 2) NOT NULL DEFAULT 1.0, -- multiplier 1.0 to 1.5
  surge_multiplier DECIMAL(3, 2) NOT NULL DEFAULT 1.0,
  final_price DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_transit', 'completed', 'cancelled')),
  estimated_duration INTEGER, -- in minutes
  qr_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create skyports table for landing zones
CREATE TABLE public.skyports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location JSONB NOT NULL, -- {lat, lng}
  address TEXT NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 4,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create no_fly_zones table for restricted areas
CREATE TABLE public.no_fly_zones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  reason TEXT NOT NULL,
  coordinates JSONB NOT NULL, -- array of {lat, lng} for polygon
  severity TEXT NOT NULL DEFAULT 'high' CHECK (severity IN ('low', 'medium', 'high')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vehicles table for fleet management
CREATE TABLE public.vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_code TEXT NOT NULL UNIQUE,
  tier TEXT NOT NULL CHECK (tier IN ('skypod', 'aeroluxe')),
  current_location JSONB, -- {lat, lng}
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'in_flight', 'maintenance', 'charging')),
  capacity INTEGER NOT NULL,
  speed_factor DECIMAL(3, 2) NOT NULL DEFAULT 1.0,
  battery_level INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skyports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.no_fly_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bookings (users can view their own bookings)
CREATE POLICY "Users can view their own bookings" 
ON public.bookings FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" 
ON public.bookings FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" 
ON public.bookings FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for skyports (public read access)
CREATE POLICY "Skyports are viewable by everyone" 
ON public.skyports FOR SELECT 
USING (true);

-- RLS Policies for no_fly_zones (public read access)
CREATE POLICY "No-fly zones are viewable by everyone" 
ON public.no_fly_zones FOR SELECT 
USING (true);

-- RLS Policies for vehicles (public read for availability)
CREATE POLICY "Vehicles are viewable by everyone" 
ON public.vehicles FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at
BEFORE UPDATE ON public.vehicles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample SkyPorts in Bangalore
INSERT INTO public.skyports (name, location, address, capacity) VALUES
('Whitefield Tech Park SkyPort', '{"lat": 12.9698, "lng": 77.7500}', 'ITPL Main Road, Whitefield', 8),
('Electronic City Hub', '{"lat": 12.8456, "lng": 77.6603}', 'Electronics City Phase 1', 6),
('Koramangala Central', '{"lat": 12.9279, "lng": 77.6271}', '80 Feet Road, Koramangala', 4),
('Indiranagar Plaza', '{"lat": 12.9716, "lng": 77.6412}', '100 Feet Road, Indiranagar', 5),
('MG Road Business District', '{"lat": 12.9716, "lng": 77.5946}', 'MG Road Metro Station', 6);

-- Insert sample No-Fly Zones
INSERT INTO public.no_fly_zones (name, reason, coordinates, severity) VALUES
('HAL Airport Restricted Zone', 'Military and Civil Aviation Area', '[{"lat": 12.9500, "lng": 77.6682}, {"lat": 12.9600, "lng": 77.6782}, {"lat": 12.9500, "lng": 77.6882}, {"lat": 12.9400, "lng": 77.6782}]', 'high'),
('Vidhana Soudha Government Complex', 'High Security Government Buildings', '[{"lat": 12.9795, "lng": 77.5912}, {"lat": 12.9805, "lng": 77.5932}, {"lat": 12.9785, "lng": 77.5942}, {"lat": 12.9775, "lng": 77.5922}]', 'high'),
('Yelahanka Air Force Station', 'Military Airbase', '[{"lat": 13.1352, "lng": 77.5986}, {"lat": 13.1452, "lng": 77.6086}, {"lat": 13.1352, "lng": 77.6186}, {"lat": 13.1252, "lng": 77.6086}]', 'high');

-- Insert sample vehicles
INSERT INTO public.vehicles (vehicle_code, tier, current_location, capacity, speed_factor) VALUES
('SP-001', 'skypod', '{"lat": 12.9698, "lng": 77.7500}', 1, 1.0),
('SP-002', 'skypod', '{"lat": 12.8456, "lng": 77.6603}', 1, 1.0),
('AL-001', 'aeroluxe', '{"lat": 12.9716, "lng": 77.6412}', 4, 1.3),
('AL-002', 'aeroluxe', '{"lat": 12.9279, "lng": 77.6271}', 4, 1.3);