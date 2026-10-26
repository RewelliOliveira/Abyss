import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText, DrawSVGPlugin)

export { gsap, ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText, DrawSVGPlugin, useGSAP }
