import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Navigation, Plane } from "lucide-react";
import { toast } from "sonner";

interface BookingFormProps {
  onLocationUpdate: (pickup: { lat: number; lng: number; address: string }, destination: { lat: number; lng: number; address: string }) => void;
  onVehicleSelect: (tier: 'skypod' | 'aeroluxe') => void;
  onConfirmBooking: () => void;
  pricing: {
    baseDistance: number;
    routeComplexity: number;
    surgeMultiplier: number;
    finalPrice: number;
  } | null;
}

const BookingForm = ({ onLocationUpdate, onVehicleSelect, onConfirmBooking, pricing }: BookingFormProps) => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [destination, setDestination] = useState("");
  const [vehicleTier, setVehicleTier] = useState<'skypod' | 'aeroluxe'>('skypod');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(location);
          setIsLoadingLocation(false);
          toast.success("Location detected!");
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to Bangalore center
          const defaultLocation = { lat: 12.9716, lng: 77.5946 };
          setCurrentLocation(defaultLocation);
          setIsLoadingLocation(false);
          toast.info("Using default location: Bangalore");
        }
      );
    } else {
      const defaultLocation = { lat: 12.9716, lng: 77.5946 };
      setCurrentLocation(defaultLocation);
      setIsLoadingLocation(false);
      toast.info("Geolocation not supported. Using default location.");
    }
  };

  const handleDestinationSearch = async () => {
    if (!destination.trim()) {
      toast.error("Please enter a destination");
      return;
    }

    // Simple geocoding simulation - in production, use proper geocoding API
    const destinations: { [key: string]: { lat: number; lng: number } } = {
      "whitefield": { lat: 12.9698, lng: 77.7500 },
      "electronic city": { lat: 12.8456, lng: 77.6603 },
      "koramangala": { lat: 12.9279, lng: 77.6271 },
      "indiranagar": { lat: 12.9716, lng: 77.6412 },
      "mg road": { lat: 12.9716, lng: 77.5946 },
    };

    const normalizedDest = destination.toLowerCase();
    let destLocation = null;

    for (const [key, value] of Object.entries(destinations)) {
      if (normalizedDest.includes(key)) {
        destLocation = value;
        break;
      }
    }

    if (!destLocation) {
      // Default to a random nearby location
      destLocation = {
        lat: 12.9716 + (Math.random() - 0.5) * 0.2,
        lng: 77.5946 + (Math.random() - 0.5) * 0.2,
      };
    }

    if (currentLocation) {
      onLocationUpdate(
        { ...currentLocation, address: "Current Location" },
        { ...destLocation, address: destination }
      );
      toast.success("Route calculated!");
    }
  };

  const handleVehicleChange = (value: string) => {
    const tier = value as 'skypod' | 'aeroluxe';
    setVehicleTier(tier);
    onVehicleSelect(tier);
  };

  return (
    <div className="space-y-6">
      {/* Location Section */}
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Flight Route
          </CardTitle>
          <CardDescription>Plan your journey through Bangalore skies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="pickup" className="flex items-center gap-2 mb-2">
              <Navigation className="w-4 h-4 text-primary" />
              Pickup Location
            </Label>
            <div className="flex gap-2">
              <Input
                id="pickup"
                value={currentLocation ? `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}` : ""}
                disabled
                className="bg-muted"
              />
              <Button
                variant="outline"
                onClick={getCurrentLocation}
                disabled={isLoadingLocation}
              >
                {isLoadingLocation ? "Detecting..." : "Refresh"}
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="destination" className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-accent" />
              Destination
            </Label>
            <div className="flex gap-2">
              <Input
                id="destination"
                placeholder="Enter destination (e.g., Whitefield, MG Road)"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleDestinationSearch()}
              />
              <Button onClick={handleDestinationSearch} className="bg-primary">
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Selection */}
      {pricing && (
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="w-5 h-5 text-primary" />
              Select Vehicle Tier
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={vehicleTier} onValueChange={handleVehicleChange}>
              <div className="space-y-4">
                <Card className={`cursor-pointer transition-all ${vehicleTier === 'skypod' ? 'ring-2 ring-primary' : ''}`}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <RadioGroupItem value="skypod" id="skypod" />
                    <Label htmlFor="skypod" className="flex-1 cursor-pointer">
                      <div className="font-bold text-lg">SkyPod (Economy)</div>
                      <div className="text-sm text-muted-foreground">Compact drone-style pod • 1 Passenger • Essential luggage</div>
                      <div className="text-sm font-semibold text-primary mt-1">Standard Speed</div>
                    </Label>
                  </CardContent>
                </Card>

                <Card className={`cursor-pointer transition-all ${vehicleTier === 'aeroluxe' ? 'ring-2 ring-accent' : ''}`}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <RadioGroupItem value="aeroluxe" id="aeroluxe" />
                    <Label htmlFor="aeroluxe" className="flex-1 cursor-pointer">
                      <div className="font-bold text-lg">AeroLuxe (Premium)</div>
                      <div className="text-sm text-muted-foreground">Luxury cabin • 2-4 Passengers • Noise-cancelled • Work-desk</div>
                      <div className="text-sm font-semibold text-accent mt-1">High Speed (+30%)</div>
                    </Label>
                  </CardContent>
                </Card>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {/* Pricing Display */}
      {pricing && (
        <Card className="glass-panel border-primary/50">
          <CardHeader>
            <CardTitle>Flight Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base Distance:</span>
              <span>{pricing.baseDistance.toFixed(2)} km</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Route Complexity:</span>
              <span>{pricing.routeComplexity}x</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Surge Factor:</span>
              <span className={pricing.surgeMultiplier > 1 ? "text-destructive" : ""}>{pricing.surgeMultiplier}x</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-xl font-bold">
              <span>Total Price:</span>
              <span className="text-primary">₹{pricing.finalPrice.toFixed(2)}</span>
            </div>
            
            <Button 
              className="w-full bg-primary hover:bg-primary/90 glow-effect"
              size="lg"
              onClick={onConfirmBooking}
            >
              Confirm Booking
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingForm;
