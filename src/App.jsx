import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  CalendarDays,
  Camera,
  Gamepad2,
  Mail,
  MapPin,
  MessageCircle,
  Music,
  PawPrint,
  Phone,
  SkipBack,
  SkipForward,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import './App.css'
import BorderGlow from './components/BorderGlow'

const contacts = [
  { icon: MapPin, label: '现居', value: '山东济南', href: '#profile' },
  { icon: Mail, label: '邮箱', value: 'q444584090@gmail.com', href: 'mailto:q444584090@gmail.com' },
  { icon: MessageCircle, label: '微信', value: 'wyf444584090', href: '#contact' },
]

const hobbies = [
  {
    title: '艾尔登法环',
    tag: 'Elden Ring',
    image: '/media/games/elden-ring.jpg',
  },
  {
    title: '黑神话：悟空',
    tag: 'Black Myth: Wukong',
    image: '/media/games/black-myth-wukong.jpg',
  },
  {
    title: '赛博朋克 2077',
    tag: 'Cyberpunk 2077',
    image: '/media/games/cyberpunk-2077.jpg',
  },
  {
    title: '荒野大镖客 2',
    tag: 'Red Dead Redemption 2',
    image: '/media/games/red-dead-redemption-2.jpg',
  },
]

const dogs = [
  {
    name: '九妹',
    tag: '中华田园犬',
    image: '/media/hobby-dog.jpg',
  },
  {
    name: '五月',
    tag: '中华田园犬',
    image: '/media/hobby-dog.jpg',
  },
  {
    name: '九妹',
    tag: '日常散步',
    image: '/media/hobby-dog.jpg',
  },
  {
    name: '五月',
    tag: '慵懒午后',
    image: '/media/hobby-dog.jpg',
  },
]

const bands = [
  { name: '声音玩具', logo: '/media/bands/band-shengyinwanju-900.jpg' },
  { name: '李志', logo: '/media/bands/band-lizhi-900.jpg' },
  { name: '赵雷', logo: '/media/bands/band-zhaolei-900.jpg' },
  { name: '刺猬', logo: '/media/bands/band-ciwei-900.jpg' },
  { name: '宋冬野', logo: '/media/bands/band-songdongye-900.jpg' },
  { name: '回春丹', logo: '/media/bands/band-huichundan-hcd-900.jpg' },
]

const festivals = [
  {
    year: '2023',
    name: '济南新青年音乐节',
    city: '济南',
    image: '/media/festival-jinan-2023.jpg',
  },
  {
    year: '2024',
    name: '安吉大麓音乐节',
    city: '安吉',
    image: '/media/festival-anji-2024.jpg',
  },
  {
    year: '2025',
    name: '徐州安集海音乐节',
    city: '徐州',
    image: '/media/festival-xuzhou-2025.jpg',
  },
  {
    year: '2025',
    name: '德州新青年音乐节',
    city: '德州',
    image: '/media/festival-dezhou-2025.jpg',
  },
  {
    year: '2025.07',
    name: '潍坊新青年音乐节',
    city: '潍坊',
    image: '/media/festival-weifang-2025.jpg',
  },
  {
    year: '2025',
    name: '连岛音乐节',
    city: '连岛',
    image: '/media/festival-liandao-2025.jpg',
  },
  {
    year: '2026',
    name: '济宁新青年音乐节',
    city: '济宁',
    image: '/media/festival-jining-2026.jpg',
  },
]

const travels = [
  {
    place: '布达拉宫',
    date: '拉萨',
    image: '/media/travel-cities/potala-palace.jpg',
  },
  {
    place: '纳木错',
    date: '西藏',
    image: '/media/travel-cities/namtso.jpg',
  },
  {
    place: '珠穆朗玛峰',
    date: '日喀则',
    image: '/media/travel-cities/everest.jpg',
  },
  {
    place: '赛里木湖',
    date: '新疆',
    image: '/media/travel-cities/sayram-lake.jpg',
  },
  {
    place: '塔克拉玛干',
    date: '新疆',
    image: '/media/travel-cities/taklamakan.jpg',
  },
  {
    place: '喀什',
    date: '新疆',
    image: '/media/travel-cities/kashgar.jpg',
  },
  {
    place: '喀拉峻',
    date: '新疆',
    image: '/media/travel-cities/kalajun.jpg',
  },
  {
    place: '色林错',
    date: '西藏',
    image: '/media/travel-cities/seling-lake.jpg',
  },
  {
    place: '班公湖',
    date: '西藏',
    image: '/media/travel-cities/bangong-lake.jpg',
  },
  {
    place: '夏塔',
    date: '新疆',
    image: '/media/travel-cities/xiata.jpg',
  },
  {
    place: '茂兰',
    date: '贵州',
    image: '/media/travel-cities/maolan.jpg',
  },
  {
    place: '兴义',
    date: '贵州',
    image: '/media/travel-cities/xingyi.jpg',
  },
  {
    place: '黔东南',
    date: '贵州',
    image: '/media/travel-cities/qiandongnan.jpg',
  },
  {
    place: '东山岛',
    date: '福建',
    image: '/media/travel-cities/dongshan-island.jpg',
  },
  {
    place: '土楼',
    date: '福建',
    image: '/media/travel-cities/tulou.jpg',
  },
  {
    place: '厦门',
    date: '福建',
    image: '/media/travel-cities/xiamen.jpg',
  },
  {
    place: '泉州',
    date: '福建',
    image: '/media/travel-cities/quanzhou.jpg',
  },
  {
    place: '南京',
    date: '江苏',
    image: '/media/travel-cities/nanjing.jpg',
  },
  {
    place: '扬州',
    date: '江苏',
    image: '/media/travel-cities/yangzhou.jpg',
  },
  {
    place: '绍兴',
    date: '浙江',
    image: '/media/travel-cities/shaoxing.jpg',
  },
  {
    place: '杭州',
    date: '浙江',
    image: '/media/travel-cities/hangzhou.jpg',
  },
  {
    place: '西递',
    date: '安徽',
    image: '/media/travel-cities/xidi.jpg',
  },
  {
    place: '哈尔滨',
    date: '黑龙江',
    image: '/media/travel-cities/harbin.jpg',
  },
  {
    place: '天津',
    date: '天津',
    image: '/media/travel-cities/tianjin.jpg',
  },
  {
    place: '青岛',
    date: '山东',
    image: '/media/travel-cities/qingdao.jpg',
  },
  {
    place: '重庆',
    date: '重庆',
    image: '/media/travel-cities/chongqing.jpg',
  },
  {
    place: '大同',
    date: '山西',
    image: '/media/travel-cities/datong.jpg',
  },
  {
    place: '乌兰布统',
    date: '内蒙古',
    image: '/media/travel-cities/ulan-butong.jpg',
  },
  {
    place: '桂林',
    date: '广西',
    image: '/media/travel-cities/guilin.jpg',
  },
  {
    place: '昆明',
    date: '云南',
    image: '/media/travel-cities/kunming.jpg',
  },
  {
    place: '大理',
    date: '云南',
    image: '/media/travel-cities/dali.jpg',
  },
  {
    place: '抚仙湖',
    date: '云南',
    image: '/media/travel-cities/fuxian-lake.jpg',
  },
  {
    place: '洛阳',
    date: '河南',
    image: '/media/travel-cities/luoyang.jpg',
  },
  {
    place: '解州',
    date: '山西',
    image: '/media/travel-cities/xiezhou.jpg',
  },
  {
    place: '临汾',
    date: '山西',
    image: '/media/travel-cities/linfen.jpg',
  },
]

const sheepHeroFrames = [
  '/media/sheep-morning.png',
  '/media/sheep-noon.png',
  '/media/sheep-night.png',
]

const sheepHeroVideo = '/media/hero-sheep-loop.webm'
gsap.registerPlugin(ScrollTrigger)

const musicTracks = [
  {
    title: 'The World Will Be Better',
    tone: '百家湖男孩',
    src: '/media/music/百家湖男孩 - the world will be better.mp3',
  },
  {
    title: '热河',
    tone: '耿十三',
    src: '/media/music/耿十三 - 热河。.mp3',
  },
]

function ModuleGlow({ children, className = '', animated = false, style }) {
  return (
    <BorderGlow
      className={`moduleGlow ${className}`}
      edgeSensitivity={28}
      glowColor="195 90 72"
      backgroundColor="#0b0d13"
      borderRadius={28}
      glowRadius={58}
      glowIntensity={1.55}
      coneSpread={25}
      animated={animated}
      fillOpacity={0.42}
      colors={['#c084fc', '#f472b6', '#38bdf8']}
      style={style}
    >
      {children}
    </BorderGlow>
  )
}

function BackgroundMusic() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const audioRef = useRef(null)
  const track = musicTracks[trackIndex]

  const togglePlay = async () => {
    setIsOpen(true)
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      return
    }

    try {
      await audio.play()
    } catch {
      setIsPlaying(false)
    }
  }

  const changeTrack = (direction) => {
    setTrackIndex((current) => (current + direction + musicTracks.length) % musicTracks.length)
    setIsOpen(true)
    setIsPlaying(false)
  }

  const closePlayer = () => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
    setIsOpen(false)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = isMuted
  }, [isMuted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const wasPlaying = isPlaying
    audio.pause()
    audio.load()
    if (wasPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    }
  }, [trackIndex])

  useEffect(() => () => audioRef.current?.pause(), [])

  return (
    <div className={`musicDock ${isOpen ? 'musicDockOpen' : ''} ${isPlaying ? 'musicDockPlaying' : ''}`}>
      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        muted={isMuted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => changeTrack(1)}
      />
      <button
        className="musicTrigger"
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? '暂停背景音乐' : '播放背景音乐'}
      >
        <span className="musicTriggerLabel">音乐</span>
        <span className="musicWave" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
        <Music size={18} strokeWidth={1.8} aria-hidden="true" />
      </button>

      <div className="musicPanel" aria-hidden={!isOpen}>
        <button type="button" onClick={() => changeTrack(-1)} aria-label="上一首">
          <SkipBack size={18} />
        </button>
        <div className="musicMeta">
          <span>{trackIndex + 1}. {track.title}</span>
          <strong>{track.tone}</strong>
        </div>
        <button type="button" onClick={() => changeTrack(1)} aria-label="下一首">
          <SkipForward size={18} />
        </button>
        <button type="button" onClick={() => setIsMuted((value) => !value)} aria-label={isMuted ? '取消静音' : '静音'}>
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <button type="button" onClick={closePlayer} aria-label="关闭音乐">
          <X size={18} />
        </button>
      </div>
    </div>
  )
}

function App() {
  const rootRef = useRef(null)
  const [isNavFloating, setIsNavFloating] = useState(false)
  const [heroBackgroundMode, setHeroBackgroundMode] = useState('video')

  useEffect(() => {
    const updateNavState = () => {
      setIsNavFloating(window.scrollY > window.innerHeight - 24)
    }

    updateNavState()
    window.addEventListener('scroll', updateNavState, { passive: true })
    window.addEventListener('resize', updateNavState)

    return () => {
      window.removeEventListener('scroll', updateNavState)
      window.removeEventListener('resize', updateNavState)
    }
  }, [])

  useEffect(() => {
    const preloadImages = () => {
      const imagePaths = [
        ...hobbies.map((hobby) => hobby.image),
        ...dogs.map((dog) => dog.image),
        ...bands.map((band) => band.logo),
        ...travels.map((travel) => travel.image),
      ]

      imagePaths.forEach((src) => {
        const image = new Image()
        image.decoding = 'async'
        image.src = src
      })
    }

    if ('requestIdleCallback' in window) {
      const preloadId = window.requestIdleCallback(preloadImages, { timeout: 1600 })
      return () => window.cancelIdleCallback(preloadId)
    }

    const preloadId = window.setTimeout(preloadImages, 700)
    return () => window.clearTimeout(preloadId)
  }, [])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      root.classList.add('motionReady')
      return undefined
    }

    const ctx = gsap.context(() => {
      root.classList.add('motionReady')

      gsap.set('.openingCurtain', { autoAlpha: 1, scaleY: 1, transformOrigin: 'top center' })
      gsap.set('.heroVideo, .heroSheepLoop', { scale: 1.08 })
      gsap.set('.navShell', { autoAlpha: 0, clipPath: 'inset(0% 0% 100% 0%)' })
      gsap.set('.heroEyebrow, .heroSubline, .heroPitch, .heroMotto', { y: 42, autoAlpha: 0 })
      gsap.set('.heroDisplayMain', {
        yPercent: 115,
        scaleX: 0.72,
        clipPath: 'inset(0% 0% 100% 0%)',
        transformOrigin: 'left center',
      })
      gsap.set('.heroDisplayAccent', {
        xPercent: 18,
        scaleX: 0.62,
        transformOrigin: 'right center',
      })

      const opening = gsap.timeline({ defaults: { ease: 'power4.out' } })
      opening
        .to('.openingCurtain', {
          scaleY: 0,
          duration: 1.35,
          ease: 'expo.inOut',
        })
        .to('.heroVideo, .heroSheepLoop', {
          scale: 1,
          duration: 2.2,
          ease: 'expo.out',
        }, 0.18)
        .to('.navShell', {
          autoAlpha: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.05,
        }, 0.56)
        .to('.heroEyebrow', {
          y: 0,
          autoAlpha: 1,
          duration: 0.95,
        }, 0.74)
        .to('.heroDisplayMain', {
          yPercent: 0,
          scaleX: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.45,
          stagger: 0.16,
          ease: 'expo.out',
        }, 0.94)
        .to('.heroSubline', {
          y: 0,
          autoAlpha: 1,
          duration: 0.95,
        }, 1.28)
        .to('.heroPitch', {
          y: 0,
          autoAlpha: 1,
          duration: 1.05,
        }, 1.44)
        .to('.heroMotto', {
          y: 0,
          autoAlpha: 1,
          duration: 0.95,
        }, 1.62)

      const sections = gsap.utils.toArray('.pageSurface .sectionFrame')
      sections.forEach((section) => {
        const title = section.querySelector('.sectionHeading h2')
        const intro = section.querySelector('.bandsIntro, .contactInner > p')
        const cards = section.querySelectorAll('.moduleGlow, .endContactGrid a')

        gsap.set([title, intro].filter(Boolean), { autoAlpha: 0 })
        gsap.set(title, {
          y: 70,
          scaleY: 0.78,
          clipPath: 'inset(0% 0% 100% 0%)',
          transformOrigin: 'left bottom',
        })
        gsap.set(intro, { y: 38 })
        gsap.set(cards, {
          y: 92,
          autoAlpha: 0,
          scale: 0.94,
          clipPath: 'inset(18% 0% 18% 0%)',
          transformOrigin: 'center bottom',
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 64%',
            once: true,
          },
          defaults: { ease: 'expo.out' },
        })

        tl.to(title, {
            y: 0,
            scaleY: 1,
            autoAlpha: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.15,
          })
          .to(intro, {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
          }, '-=0.72')
          .to(cards, {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.15,
            stagger: {
              each: 0.1,
              from: 'start',
            },
          }, '-=0.44')
      })

      gsap.utils.toArray('.festivalImage img, .travelCard img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -5, scale: 1.08 },
          {
            yPercent: 5,
            scale: 1.04,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('article') || img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.15,
            },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={rootRef}>
      <div className="openingCurtain" aria-hidden="true" />
      <section className="hero" id="home">
        {heroBackgroundMode === 'video' ? (
          <video
            className="heroVideo heroSheepVideo"
            autoPlay
            muted
            loop
            playsInline
            poster="/media/sheep-morning-poster.jpg"
            onError={() => setHeroBackgroundMode('frames')}
          >
            <source src={sheepHeroVideo} type="video/webm" />
          </video>
        ) : heroBackgroundMode === 'frames' ? (
          <div className="heroSheepLoop" aria-hidden="true">
            {sheepHeroFrames.map((frame, index) => (
              <div
                className={`heroSheepFrame heroSheepFrame${index + 1}`}
                key={frame}
                style={{ backgroundImage: `url(${frame})` }}
              />
            ))}
          </div>
        ) : (
          <video
            className="heroVideo"
            autoPlay
            muted
            loop
            playsInline
            poster="/media/contact-bg.jpg"
          >
            <source
              src="/media/hero-video.mp4"
              type="video/mp4"
            />
          </video>
        )}
        <div className="heroShade" />

        <header className={`navShell ${isNavFloating ? 'navFloating' : ''}`}>
          <a className="brand" href="#home" aria-label="返回首页">
            <span className="brandMark">WYF</span>
            <span>Wang Yifan</span>
          </a>
          <nav className="navLinks" aria-label="主导航">
            <a href="#profile">经历</a>
            <a href="#games">游戏</a>
            <a href="#dogs">宠物</a>
            <a href="#bands">乐队</a>
            <a href="#travel">旅行</a>
          </nav>
          <BackgroundMusic />
          <a className="contactButton" href="#contact">
            联系我
            <ArrowRight size={18} strokeWidth={1.8} />
          </a>
        </header>

        <div className="heroInner">
          <div className="heroEyebrow">
            <Sparkles size={16} strokeWidth={1.7} />
            <span>HELLO! · 2026 / 山东济南</span>
            <span className="heroEyebrowTag">// WYF</span>
          </div>

          <h1 className="heroDisplay">
            <span className="heroDisplayMain">WANG</span>
            <span className="heroDisplayMain heroDisplayAccent">YIFAN</span>
          </h1>

          <div className="heroSubline">
            <span className="heroSublineCN">王 祎 凡</span>
            <span className="heroSublineDot" />
            <span className="heroSublineRole">AI TRAINER · CONTENT JUDGE</span>
          </div>

          <div className="heroPitch">
            <p className="heroPitchText">
              the world will be better
              </p>
              <a className="primaryAction" href="#contact">
                CONTACT ME
                <ArrowRight size={18} strokeWidth={1.8} />
              </a>
          </div>

          <div className="heroMotto">
            <span>王祎凡 / AI Trainer</span>
            <ArrowRight size={14} strokeWidth={1.8} />
            <span>KEEP YOUNG, KEEP GOING</span>
            <span className="heroMottoDot" />
            <span>DESIGN IS NOT DECORATION</span>
          </div>
        </div>
      </section>

      <div className="pageSurface">
      <section className="profile sectionFrame" id="profile">
        <div className="sectionHeading">
          <span>Profile</span>
          <h2>个人经历</h2>
        </div>
        <div className="profileGrid">
          <ModuleGlow animated>
          <div className="profileIdCard">
            <div className="profileIdMark">
              <Sparkles size={28} strokeWidth={1.4} />
            </div>
            <h3>王祎凡</h3>
            <span className="profileIdTag">AI TRAINER · CONTENT JUDGE</span>
            <span className="profileIdCity">山东 · 济南</span>
          </div>
          </ModuleGlow>

          <ModuleGlow>
          <div className="profileBioCard">
            <h2>关于我</h2>
            <p>
              工地出来的工程师、主机游戏玩家、两只小狗的铲屎官、乐队现场常客、国内走过 100+ 座城市。
            </p>
            <div className="contactRow">
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <a href={href || '#contact'} key={label}>
                  <Icon size={16} />
                  <span>{value}</span>
                </a>
              ))}
            </div>
          </div>
          </ModuleGlow>
        </div>
        <div className="profileStats">
          <ModuleGlow>
          <div className="profileStat">
            <strong>5+</strong>
            <span>年工地一线</span>
          </div>
          </ModuleGlow>
          <ModuleGlow>
          <div className="profileStat">
            <strong>2本</strong>
            <span>一级建造师证书</span>
          </div>
          </ModuleGlow>
          <ModuleGlow>
          <div className="profileStat">
            <strong>132</strong>
            <span>座城市</span>
          </div>
          </ModuleGlow>
        </div>
      </section>

      <section className="sectionFrame" id="games">
        <div className="sectionHeading">
          <span>Games</span>
          <h2 className="sectionTitleIconed">
            <Gamepad2 size={40} />
            游戏
          </h2>
        </div>
        <div className="hobbyGrid">
          {hobbies.map((hobby) => (
            <ModuleGlow key={hobby.title}>
            <article className="hobbyCard">
              <img src={hobby.image} alt={hobby.title} decoding="async" />
              <div>
                <span>{hobby.tag}</span>
                <h3>{hobby.title}</h3>
              </div>
            </article>
            </ModuleGlow>
          ))}
        </div>
      </section>

      <section className="sectionFrame" id="dogs">
        <div className="sectionHeading">
          <span>Pets</span>
          <h2 className="sectionTitleIconed">
            <PawPrint size={40} />
            宠物
          </h2>
        </div>
        <div className="dogGrid">
          {dogs.map((dog, index) => (
            <ModuleGlow key={`${dog.name}-${index}`}>
            <article className="dogCard">
              <img src={dog.image} alt={dog.name} decoding="async" />
              <div>
                <PawPrint size={24} />
                <span>{dog.tag}</span>
                <h3>{dog.name}</h3>
              </div>
            </article>
            </ModuleGlow>
          ))}
        </div>
      </section>

      <section className="bandsSection sectionFrame" id="bands">
        <div className="sectionHeading">
          <span>Favorite Bands</span>
          <h2 className="sectionTitleIconed">
            <Music size={40} />
            喜欢的乐队
          </h2>
          <p className="bandsIntro">
            音乐节像一种阶段性标记：每去一次，就给生活多留下一段可以回放的现场。
            下面这些乐队和歌手，是我反复想回现场的理由。
          </p>
        </div>

        <div className="bandGrid">
          {bands.map((band) => (
            <ModuleGlow key={band.name}>
            <article className="bandCard">
              <div className="bandImage">
                <img src={band.logo} alt={`${band.name} 乐队图标`} decoding="async" />
              </div>
              <h3>{band.name}</h3>
            </article>
            </ModuleGlow>
          ))}
        </div>

        <div className="sectionHeading festivalSubheading">
          <span>Music Festival Footprints</span>
          <h2>去过的音乐节</h2>
        </div>

        <div className="festivalGrid">
          {festivals.map((festival) => (
            <ModuleGlow key={`${festival.year}-${festival.name}`}>
            <article className="festivalCard">
              <div className="festivalImage">
                <img src={festival.image} alt={`${festival.name} 现场照片`} loading="lazy" decoding="async" />
                <div className="festivalYearBadge">
                  <CalendarDays size={16} />
                  {festival.year}
                </div>
              </div>
              <div className="festivalBody">
                <h3>{festival.name}</h3>
                <p>
                  <MapPin size={14} />
                  {festival.city}
                </p>
              </div>
            </article>
            </ModuleGlow>
          ))}
        </div>
      </section>

      <section className="sectionFrame travelSection" id="travel">
        <div className="sectionHeading">
          <span>Travel Notes</span>
          <h2 className="sectionTitleIconed">
            <Camera size={40} />
            旅行日记
          </h2>
        </div>
        <div className="travelGrid">
          {travels.map((travel) => (
            <ModuleGlow key={travel.place}>
            <article className="travelCard">
              <img src={travel.image} alt={`${travel.place}旅行照片`} loading="lazy" decoding="async" />
              <div>
                <MapPin size={18} />
                <h3>{travel.place}</h3>
                <p>{travel.date}</p>
              </div>
            </article>
            </ModuleGlow>
          ))}
        </div>
      </section>

      <section className="contactEnd" id="contact">
        <div className="contactInner">
          <div className="sectionHeading">
            <span>Contact</span>
            <h2>保持热爱</h2>
          </div>
          <p>
            <span>“一代人终将老去，但总有人正年轻。”</span>
            <span>希望我们都能保持年轻的勇气和向前的热爱。</span>
          </p>
          <div className="endContactGrid">
            {contacts.map(({ icon: Icon, label, value, href }) => (
              <ModuleGlow key={label}>
              <a href={href}>
                <Icon size={30} />
                <span>{label}</span>
                <strong>{value}</strong>
              </a>
              </ModuleGlow>
            ))}
          </div>
          <div className="footerLine">
            <Phone size={18} />
            Portfolio v1.1 / Built with React + Vite
          </div>
        </div>
      </section>
      </div>
    </main>
  )
}

export default App
