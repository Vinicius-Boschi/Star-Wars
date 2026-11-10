<template>
  <section class="infos">
    <ul class="infos__list">
      <li v-for="item in items" :key="item.key" class="infos__item">
        <component :is="item.icon" class="infos__icon" :size="32" />
        <div class="infos__text">
          <p>{{ stats[item.key] ?? "-" }}</p>
          <p>{{ item.label }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { getStats } from "../services/starWarsApi"
import {
  Users,
  PawPrint,
  Bot,
  MapPin,
  Clapperboard,
  Building2,
  Globe,
  Rocket,
  Dna,
  Car,
} from "lucide-vue-next"

const items = [
  { key: "characters", label: "Characters", icon: Users },
  { key: "creatures", label: "Creatures", icon: PawPrint },
  { key: "droids", label: "Droids", icon: Bot },
  { key: "locations", label: "Locations", icon: MapPin },
  { key: "movies", label: "Movies", icon: Clapperboard },
  { key: "organizations", label: "Organizations", icon: Building2 },
  { key: "planets", label: "Planets", icon: Globe },
  { key: "ships", label: "Ships", icon: Rocket },
  { key: "species", label: "Species", icon: Dna },
  { key: "vehicles", label: "Vehicles", icon: Car },
]

const stats = ref({})

onMounted(async () => {
  try {
    stats.value = await getStats()
  } catch (error) {
    console.error(error)
  }
})
</script>