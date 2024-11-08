"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

const tileData = {
  types: ["normal", "regular", "white", "black"],
  uses: ["home", "commercial"],
  colors: ["White", "Black", "Gray", "Beige", "Blue", "Green", "Custom"],
  sizes: [
    "Small (1-4 inches)",
    "Medium (4-12 inches)",
    "Large (12-24 inches)",
    "Extra Large (24+ inches)",
  ],
};

export default function Home() {
  const [formData, setFormData] = useState({
    tileType: "",
    useType: "",
    peopleCount: 1,
    colorPreference: "",
    tileSize: "",
  });
  const [suggestedTiles, setSuggestedTiles] = useState<
    { name: string; color: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowSuggestions(false);
    try {
      const response = await fetch("/api/tiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setSuggestedTiles(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching tile data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F10] to-[#1A1A1B] text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-[#1A1A1B] text-gray-200 shadow-xl rounded-lg overflow-hidden border-none flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 p-6">
          <CardHeader className="mb-6">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-100"
            >
              Advanced Tile Survey
            </motion.h2>
          </CardHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
     <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <Label
                htmlFor="tileType"
                className="text-sm font-medium text-gray-300"
              >
                What type of tile do you need?
              </Label>
              <Select
                onValueChange={(value) => handleChange("tileType", value)}
              >
                <SelectTrigger
                  id="tileType"
                  className="bg-[#2A2A2B] border-[#3A3A3B] focus:ring-teal-500 text-white" // Updated to text-white
                >
                  <SelectValue placeholder="Select tile type" />
                </SelectTrigger>
                <SelectContent className="!text-white bg-[#2A2A2B] border-[#3A3A3B]">
                  {tileData.types.map((type) => (
                    <SelectItem
                      className="text-white hover:bg-[#3A3A3B] focus:bg-[#3A3A3B]"
                      key={type}
                      value={type.toLowerCase()}
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-2"
            >
              <Label
                htmlFor="useType"
                className="text-sm font-medium text-gray-300"
              >
                Is it for commercial use or for home?
              </Label>
              <Select onValueChange={(value) => handleChange("useType", value)}>
                <SelectTrigger
                  id="useType"
                  className="bg-[#2A2A2B] border-[#3A3A3B] focus:ring-teal-500 text-gray-200"
                >
                  <SelectValue placeholder="Select use type" />
                </SelectTrigger>
                <SelectContent className="bg-[#2A2A2B] border-[#3A3A3B]">
                  {tileData.uses.map((use) => (
                    <SelectItem
                      className="text-white hover:bg-[#3A3A3B] focus:bg-[#3A3A3B]"
                      key={use}
                      value={use.toLowerCase()}
                    >
                      {use}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2"
            >
              <Label
                htmlFor="peopleCount"
                className="text-sm font-medium text-gray-300"
              >
                How many people will be using the space?
              </Label>
              <div className="flex items-center space-x-4">
                <Slider
                  id="peopleCount"
                  min={1}
                  max={100}
                  step={1}
                  value={[formData.peopleCount]}
                  onValueChange={([value]) =>
                    handleChange("peopleCount", value)
                  }
                  className="flex-grow"
                />
                <span className="text-gray-200 font-medium bg-[#2A2A2B] px-3 py-1 rounded-md min-w-[3rem] text-center">
                  {formData.peopleCount}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-2"
            >
              <Label
                htmlFor="colorPreference"
                className="text-sm font-medium text-gray-300"
              >
                What is your color preference?
              </Label>
              <Select
                onValueChange={(value) =>
                  handleChange("colorPreference", value)
                }
              >
                <SelectTrigger
                  id="colorPreference"
                  className="bg-[#2A2A2B] border-[#3A3A3B] focus:ring-teal-500 text-gray-200"
                >
                  <SelectValue placeholder="Select color preference" />
                </SelectTrigger>
                <SelectContent className="bg-[#2A2A2B] border-[#3A3A3B]">
                  {tileData.colors.map((color) => (
                    <SelectItem
                      className="text-white hover:bg-[#3A3A3B] focus:bg-[#3A3A3B]"
                      key={color}
                      value={color.toLowerCase()}
                    >
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                type="submit"
                className="w-full bg-teal-400 hover:bg-teal-600 transition-colors duration-300 text-white font-medium py-2 rounded-md"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </motion.div>
          </form>
        </div>
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="w-full md:w-1/3 bg-[#2A2A2B] md:rounded-l-lg overflow-hidden"
            >
              <CardHeader className="bg-[#1A1A1B] py-4 px-6">
                <h3 className="text-2xl font-bold text-gray-100">
                  Suggested Tiles
                </h3>
              </CardHeader>
              <div className="p-6 space-y-4">
                <AnimatePresence>
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Skeleton className="w-full h-20 bg-[#3A3A3B] rounded-lg" />
                      <Skeleton className="w-full h-20 bg-[#3A3A3B] rounded-lg mt-4" />
                      <Skeleton className="w-full h-20 bg-[#3A3A3B] rounded-lg mt-4" />
                    </motion.div>
                  ) : suggestedTiles.length > 0 ? (
                    suggestedTiles.map((tile, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                          delay: index * 0.1,
                        }}
                        className="bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg p-4 shadow-lg transform hover:scale-105 transition-transform duration-200"
                      >
                        <h4 className="text-xl font-bold text-white mb-2">
                          {tile.name}
                        </h4>
                        <p className="text-gray-100">{tile.color}</p>
                      </motion.div>
                    ))
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gray-400"
                    >
                      No tiles suggested yet.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}