const CORS_PROXY = "https://tamil-radio-proxy.folkadonis.workers.dev";

/* ===== TV Channel Data ===== */
const TV_CHANNELS = [
  /* Mainstream — confirmed live HLS streams */
  { id:"ms1", name:"Raj TV",       logo:"https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_RAJ_TV/images/LOGO_HD/image.png",                    url:"https://livestream.rajtv.tv/hlslive/Admin/px08241087/live/RajTV_Digital_plus/master_1.m3u8" },
  { id:"ms2", name:"Kalaignar TV", logo:"https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/transparentImages/Kalaignar%20TV.png",                        url:"https://segment.yuppcdn.net/240122/kalaignartv/playlist.m3u8" },
  /* Other channels — direct HLS (live-tested, CORS-verified) */
  { id:"tv1",  name:"Makkal TV",           logo:"https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_MAKKAL_TV/images/LOGO_HD/image.png",         url:"https://5k8q87azdy4v-hls-live.wmncdn.net/MAKKAL/271ddf829afeece44d8732757fba1a66.sdp/playlist.m3u8" },
  { id:"tv2",  name:"News18 Tamil Nadu",   logo:"https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NEWS18_TAMIL_NADU/images/LOGO_HD/image.png", url:"https://n18syndication.akamaized.net/bpk-tv/News18_Tamil_Nadu_NW18_MOB/output01/master.m3u8" },
  { id:"tv3",  name:"Polimer TV",          logo:"https://dtil.tmsimg.com/assets/s143665_ld_h15_aa.png?lock=720x540",                                                                      url:"https://cdn-2.pishow.tv/live/1241/master.m3u8" },
  { id:"tv4",  name:"News 7 Tamil",        logo:"https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NEWS7_TAMIL/images/LOGO_HD/image.png",       url:"https://segment.yuppcdn.net/240122/news7/playlist.m3u8" },
  { id:"tv5",  name:"Puthiya Thalaimurai", logo:"https://dtil.tmsimg.com/assets/s143692_ld_h15_aa.png?lock=720x540",                                                                      url:"https://segment.yuppcdn.net/240122/puthiya/playlist.m3u8" },
  { id:"tv6",  name:"Thanthi TV",          logo:"https://dtil.tmsimg.com/assets/s144000_ld_h15_aa.png?lock=720x540",                                                                      url:"https://cdn-3.pishow.tv/live/1612/master.m3u8" },
  { id:"tv7",  name:"Peppers TV",          logo:"https://jiotvimages.cdn.jio.com/dare_images/images/Peppers_TV.png",                                                                       url:"https://cdn-2.pishow.tv/live/1383/master.m3u8" },
  { id:"tv8",  name:"Roja TV",             logo:"https://jiotvimages.cdn.jio.com/dare_images/images/rojatv.png",                                                                           url:"https://live.rojatv.cloud/rojatv/rojatv/index.m3u8" },
  { id:"tv9",  name:"7S Music",            logo:"https://i.imgur.com/zDiIhdN.png",                                                                                                         url:"https://mumt03.tangotv.in/7SMUSIC/index.m3u8" },
  { id:"tv10", name:"Aaryaa TV",           logo:"https://jiotvimages.cdn.jio.com/dare_images/images/aryatvtamil.png",                                                                      url:"https://stream.ottlive.co.in/aryatvtamil/index.m3u8" },
  { id:"tv11", name:"Aastha Tamil",        logo:"https://i.imgur.com/YQK9ewf.png",                                                                                                         url:"https://aasthaott.akamaized.net/110923/smil:aasthatamil.smil/playlist.m3u8" },
  { id:"tv12", name:"Life TV",             logo:"https://i.ibb.co/v1C0bdR/logo-1.png",                                                                                                     url:"https://lifetv.livebox.co.in/lifetvhls/lifetv.m3u8" },
  { id:"tv13", name:"Sooriyan TV",         logo:"https://i.ibb.co/LSyydKj/Sooriyan-TV-Tamil.jpg",                                                                                          url:"https://live20.bozztv.com/giatv/giatv-Infinittyott/Infinittyott/playlist.m3u8" },
  { id:"tv14", name:"Suriya TV",           logo:"https://jiotvimages.cdn.jio.com/dare_images/images/suryatvtamil.png",                                                                     url:"https://stream.ottlive.co.in/suryatvtamil/index.m3u8" },
  { id:"tv15", name:"Oli TV",              logo:"https://i.ibb.co/XfvTQyJn/main-removebg-preview.png",                                                                                     url:"https://live.olidigital.in/olitv/olitv/index.m3u8" },
  { id:"tv16", name:"Sivan TV",            logo:"https://i.ibb.co/b3HG9wm/Logo-site.png",                                                                                                  url:"http://sivantv.livebox.co.in/sivantvhls/sivan.m3u8" },
  { id:"tv17", name:"Sirippoli TV",        logo:"https://dtil.tmsimg.com/assets/s143791_ld_h9_aa.png?lock=720x540",                                                                        url:"https://segment.yuppcdn.net/240122/siripoli/playlist.m3u8" },
  { id:"tv18", name:"Vaanavil TV",         logo:"https://jiotvimages.cdn.jio.com/dare_images/images/Vaanavil_TV.png",                                                                      url:"https://6n3yope4d9ok-hls-live.5centscdn.com/vaanavil/TV.stream/playlist.m3u8" },
  { id:"tv19", name:"DD Tamil",            logo:"https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_DD_TAMIL/images/LOGO_HD/image.png",           url:"https://d2lk5u59tns74c.cloudfront.net/out/v1/abf46b14847e45499f4a47f3a9afe93d/index.m3u8" },
  { id:"tv20", name:"Roja Movies",         logo:"https://jiotvimages.cdn.jio.com/dare_images/images/rojamovies.png",                                                                       url:"https://stream.rojatv.cloud/rojatv/rojatv/index.m3u8" },
  { id:"tv21", name:"Star Vijay",         logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Vijay_TV_logo.png/200px-Vijay_TV_logo.png",                                        url:"https://peaky.techcoder40.workers.dev/776.m3u8" },
  { id:"tv22", name:"Vijay Super",        logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Vijay_Super_logo.png/200px-Vijay_Super_logo.png",                                   url:"https://tglmp01.akamaized.net/out/v1/c1071012b73f4f189b202e1529e8f802/manifest.mpd" },
  { id:"tv23", name:"Chithiram",          logo:"https://i.imgur.com/xv9cWSh.png",                                                                                                                  url:"https://cdn-6.pishow.tv/live/1243/master.m3u8" },
  { id:"tv24", name:"Sankara TV",         logo:"https://i.imgur.com/2z0bDRD.png",                                                                                                                  url:"https://cdn-3.pishow.tv/live/1135/master.m3u8" },
  { id:"tv25", name:"Vendhar TV",         logo:"https://jiotvimages.cdn.jio.com/dare_images/images/Vendhar_TV.png",                                                                                url:"https://cdn-3.pishow.tv/live/1271/master.m3u8" },
  { id:"tv26", name:"Velicham TV",        logo:"https://upload.wikimedia.org/wikipedia/en/e/e4/Logo_of_Velicham_TV.png",                                                                          url:"https://cdn-3.pishow.tv/live/461/master.m3u8" },
  { id:"tv27", name:"Win TV",             logo:"https://jiotvimages.cdn.jio.com/dare_images/images/Win_TV.png",                                                                                    url:"https://cdn-4.pishow.tv/live/1531/master.m3u8" },
  { id:"tv28", name:"Thanthi One",        logo:"https://dtil.tmsimg.com/assets/s158791_ld_h15_aa.png?lock=720x540",                                                                               url:"https://mumt02.tangotv.in/THANTHIONE/index.m3u8" },
  { id:"tv29", name:"M Nadu TV",          logo:"https://jiotvimages.cdn.jio.com/dare_images/images/M_Nadu.png",                                                                                   url:"https://mumt01.tangotv.in/MNADU/index.m3u8" },
  { id:"tv30", name:"Madha TV",           logo:"https://dtil.tmsimg.com/assets/s143287_ld_h15_aa.png?lock=720x540",                                                                               url:"https://mumt02.tangotv.in/MADHATV/index.m3u8" },
  { id:"tv31", name:"Nambikkai TV",       logo:"https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NAMBIKKAI_TV/images/LOGO_HD/image.png",               url:"https://mumt02.tangotv.in/NAMBIKKAITV/index.m3u8" },
  { id:"tv32", name:"Tamil Janam",        logo:"https://jiotvimages.cdn.jio.com/dare_images/images/Janam_Tamil.png",                                                                              url:"https://mumt01.tangotv.in/JANAMTVTAMIL/index.m3u8" },
  { id:"tv33", name:"Subin TV",           logo:"https://jiotvimages.cdn.jio.com/dare_images/images/subintvtamil.png",                                                                             url:"https://stream.galaxyott.live/live/subintv/index.m3u8" },
  { id:"tv34", name:"NTC TV",             logo:"https://jiotvimages.cdn.jio.com/dare_images/images/ntvtamil.png",                                                                                 url:"https://galaxyott.live/hls/ntv.m3u8" },
  { id:"tv35", name:"History TV18 HD",    logo:"https://dtil.tmsimg.com/assets/s143133_ld_h15_aa.png?lock=720x540",                                                                               url:"https://raw.githubusercontent.com/amazeyourself/adaptive-streams/refs/heads/main/streams/in/HistoryTV18HD.m3u8" },
  { id:"tv36", name:"Zee Tamil News",     logo:"https://english.cdn.zeenews.com/images/logo/zee-tamil-logo-20.svg",                                                                               url:"https://raw.githubusercontent.com/amazeyourself/adaptive-streams/refs/heads/main/streams/in/ZMCL/ZeeTamilNews.m3u8" },
  { id:"tv37", name:"Aaseervatham TV",   logo:"https://i.imgur.com/GlfrYs7.png",                                                                                                                  url:"https://mumt04.tangotv.in/AASEERVATHAMTV/index.m3u8" },
  { id:"tv38", name:"Angel TV",          logo:"https://i.imgur.com/qKLEGU7.png",                                                                                                                  url:"https://janya-digimix.akamaized.net/vglive-sk-394914/india/ngrp:angelindia_all/playlist.m3u8" },
  { id:"tv39", name:"Brio TV",           logo:"https://jiotvimages.cdn.jio.com/dare_images/images/Brio_TV.png",                                                                                   url:"https://mumt02.tangotv.in/BRIOTV/index.m3u8" },
  { id:"tv40", name:"Dharsan TV",        logo:"https://play-lh.googleusercontent.com/brn76ZzRlqS8ylZVVcc5ZFWcqUp36iJ82WyzwiQ8-Nqi_8pIZZ_gsMCXNn6YiLhOEQ",                                      url:"https://cable91tataplay.akamaized.net/live/dharshantv/index.m3u8" },
  { id:"tv41", name:"EET TV",            logo:"https://i.imgur.com/rMldFW8.png",                                                                                                                  url:"https://live.streamjo.com/eetlive/eettv.m3u8" },
  { id:"tv42", name:"Hebron TV",         logo:"https://i0.wp.com/hebrontv.in/wp-content/uploads/2023/11/hebron-.png?w=512",                                                                       url:"https://account20.livebox.co.in/charleshls/live.m3u8" },
  { id:"tv43", name:"Imai TV",           logo:"https://i.imgur.com/9tODclu.png",                                                                                                                  url:"https://live20.bozztv.com/akamaissh101/ssh101/imaitv/playlist.m3u8" },
  { id:"tv44", name:"Malai Murasu TV",   logo:"https://i.imgur.com/OC5TQxp.png",                                                                                                                  url:"https://amg17783-amg17783c1-amgplt0173.playout.now3.amagi.tv/playlist/amg17783-amg17783c1-amgplt0173/playlist.m3u8" },
  { id:"tv45", name:"Malar TV",          logo:"",                                                                                                                                                  url:"https://cdn-3.pishow.tv/live/473/master.m3u8" },
  { id:"tv46", name:"Madhimugam TV",     logo:"https://jiotvimages.cdn.jio.com/dare_images/images/Madhimugam_TV.png",                                                                             url:"https://cdn-3.pishow.tv/live/1476/master.m3u8" },
  { id:"tv47", name:"MK Six",            logo:"https://jiotvimages.cdn.jio.com/dare_images/images/MK_Six.png",                                                                                    url:"https://cdn-3.pishow.tv/live/1253/master.m3u8" },
  { id:"tv48", name:"MNTV",             logo:"https://i.imgur.com/cFNw4Af.png",                                                                                                                   url:"https://mntv.livebox.co.in/mntvhls/live.m3u8" },
  { id:"tv49", name:"MTA6 Asia",         logo:"https://i.imgur.com/nhCNPJI.png",                                                                                                                  url:"https://livemtaasia.akamaized.net/hls/live/2039224/mta6asia/playlist.m3u8" },
  { id:"tv50", name:"MTA7 Asia",         logo:"https://i.imgur.com/3Nl8Tpu.png",                                                                                                                  url:"https://livemtaasia.akamaized.net/hls/live/2039224/mtaasia2/playlist.m3u8" },
  { id:"tv51", name:"NDTV Good Times",   logo:"https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_GOOD_TIMES/images/LOGO_HD/image.png",                  url:"https://amg01448-samsungin-ndtvgoodtimes-samsungin-ad-gp.amagi.tv/playlist/amg01448-samsungin-ndtvgoodtimes-samsungin/playlist.m3u8" },
  { id:"tv52", name:"NDTV Lanka",        logo:"https://i.imgur.com/5cyTVRJ.png",                                                                                                                  url:"https://g4wlkqqwl23a-hls-live.5centscdn.com/NDTVLANKA/1ff5fa54d14c3ff6c6bd3918bbb7db5d.sdp/playlist.m3u8" },
  { id:"tv53", name:"News J",            logo:"https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NEWS_J/images/LOGO_HD/image.png",                      url:"https://cdn-3.pishow.tv/live/1279/master.m3u8" },
  { id:"tv54", name:"OM TV",             logo:"https://jiotvimages.cdn.jio.com/dare_images/images/OM_TV.png",                                                                                     url:"https://mumt01.tangotv.in/OMTV/index.m3u8" },
  { id:"tv55", name:"Puthuyugam TV",     logo:"https://dtil.tmsimg.com/assets/s143693_ld_h15_aa.png?lock=720x540",                                                                               url:"https://mumt04.tangotv.in/PUTHUYUGAMTV/index.m3u8" },
  { id:"tv56", name:"Raj Musix",         logo:"https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_RAJ_MUSIX_TAMIL/images/LOGO_HD/image.png",             url:"https://livestream.rajtv.tv/hlslive/Admin/px08241087/live/Raj_Musix/master_1.m3u8" },
  { id:"tv57", name:"Sai TV",            logo:"https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_SAI_TV/images/LOGO_HD/image.png",                      url:"https://mumt03.tangotv.in/SAITVTAMILDEVOTIONAL/index.m3u8" },
  { id:"tv58", name:"Sairam TV",         logo:"",                                                                                                                                                  url:"https://mumt04.tangotv.in/SAIRAMTV/index.m3u8" },
  { id:"tv59", name:"Sana Plus",         logo:"https://i.imgur.com/N6tKUZv.png",                                                                                                                  url:"https://mumbai-edge.smartplaytv.in/SanaPlusHD/index.m3u8" },
  { id:"tv60", name:"Shalini TV",        logo:"https://i.imgur.com/fDdG6Y2.png",                                                                                                                  url:"https://stream.singamcloud.in/shalinitv/shalinitv/index.m3u8" },
  { id:"tv61", name:"SVBC 2",            logo:"https://dtil.tmsimg.com/assets/s143890_ld_h9_aa.png?lock=720x540",                                                                                url:"https://player.mslivestream.net/tamil/ac206e74d75b285755ee4924df87d951.sdp/playlist.m3u8" },
  { id:"tv62", name:"Tamilan TV",        logo:"https://jiotvimages.cdn.jio.com/dare_images/images/Tamilan_Television.png",                                                                        url:"https://cdn.zionmediait.com/zionmediaitserver2024/97484f5ce6da96e496a9b87c439835d0.sdp/playlist.m3u8" },
  { id:"tv63", name:"TamilVision TV",    logo:"https://i.imgur.com/DodsLuW.png",                                                                                                                  url:"https://live.cmr24.fm/TVI/HD/chunks.m3u8" },
  { id:"tv64", name:"Tunes 6",           logo:"https://jiotvimages.cdn.jio.com/dare_images/images/Tunes_6.png",                                                                                   url:"https://stream.d6-pro.com/tunes6music/live/video.m3u8" },
  { id:"tv65", name:"Ultimate TV",       logo:"https://jiotvimages.cdn.jio.com/dare_images/images/utvtamil.png",                                                                                  url:"https://stream.ottlive.co.in/utvtamil/index.m3u8" },
  { id:"tv66", name:"Vasanth TV",        logo:"https://dtil.tmsimg.com/assets/s144068_ld_h15_aa.png?lock=720x540",                                                                               url:"https://mumt04.tangotv.in/VASANTHTV/index.m3u8" },
  { id:"tv67", name:"Village TV",        logo:"https://jiotvimages.cdn.jio.com/dare_images/images/VillageTV.png",                                                                                 url:"https://villagetv.applelive.in/villagetv/villagetv/index.m3u8" },
  { id:"tv68", name:"Willow Cricket",    logo:"https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Willow_TV_logo.svg/200px-Willow_TV_logo.svg.png",                                             url:"https://cdn1.ctgiptv.com/willow-cricket/tracks-v1/mono.ts.m3u8" },
  { id:"tv69", name:"Sri Sankara TV",    logo:"https://i.imgur.com/2z0bDRD.png",                                                                                                                  url:"https://mumt05.tangotv.in/SRISANKARA/tracks-v2/mono.m3u8" },
  /* Sports / Football — CORS-verified */
  { id:"tv70", name:"Premier Sports",   logo:"https://i.imgur.com/BURPHzI.png",                                                                                                                   url:"https://amg19223-amg19223c3-amgplt0351.playout.now3.amagi.tv/playlist/amg19223-amg19223c3-amgplt0351/playlist.m3u8" },
  { id:"tv71", name:"Premier Sports 2", logo:"https://i.imgur.com/UQeXWd2.png",                                                                                                                   url:"https://amg19223-amg19223c4-amgplt0351.playout.now3.amagi.tv/playlist/amg19223-amg19223c4-amgplt0351/playlist.m3u8" },
  { id:"tv72", name:"Bahrain Sports 1", logo:"https://i.imgur.com/fBpLsbC.png",                                                                                                                   url:"https://5c7b683162943.streamlock.net/live/ngrp:sportsone_all/playlist.m3u8" },
  { id:"tv73", name:"Bahrain Sports 2", logo:"https://i.imgur.com/ZkuZmIo.png",                                                                                                                   url:"https://5c7b683162943.streamlock.net/live/ngrp:bahrainsportstwo_all/playlist.m3u8" },
  { id:"tv74", name:"Esport3",          logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Esport3.svg/960px-Esport3.svg.png",                                                       url:"https://directes-tv-int.3catdirectes.cat/live-content/esport3-hls/master.m3u8" },
  { id:"tv75", name:"TyC Sports",       logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/TyC_Sports_logo.svg/960px-TyC_Sports_logo.svg.png",                                      url:"https://amg26268-amg26268c14-freelivesports-emea-10267.playouts.now.amagi.tv/ts-us-e2-n2/playlist/amg26268-sportsstudio-tycsports-freelivesportsemea/playlist.m3u8" },
  { id:"tv76", name:"TVRI Sport",       logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/TVRI_Sport_2022.svg/960px-TVRI_Sport_2022.svg.png",                                      url:"https://ott-balancer.tvri.go.id/live/eds/SportHD/hls/SportHD.m3u8" },
  { id:"tv87", name:"DD Sports",        logo:"https://dtil.tmsimg.com/assets/s158255_ld_h15_aa.png?lock=720x540",                                                                                url:"https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/b17adfe543354fdd8d189b110617cddd/index.m3u8", proxy:true },
  /* English / International — HTTPS + CORS verified */
  { id:"tv77", name:"Asharq Discovery", logo:"https://i.imgur.com/Czxi7yk.png",                                                                                                               url:"https://svs.itworkscdn.net/asharqdiscoverylive/asharqd.smil/playlist_dvr.m3u8" },
  { id:"tv78", name:"GEM Nature",       logo:"https://i.imgur.com/ENvOMDQ.png",                                                                                                               url:"https://ca-rt.onetv.app/gemnature/index-0.m3u8?token=onetv202" },
  { id:"tv79", name:"Charge!",          logo:"https://i.imgur.com/1rxmu2u.png",                                                                                                               url:"https://fast-channels.sinclairstoryline.com/CHARGE/index.m3u8" },
  { id:"tv80", name:"FilmRise Movies",  logo:"https://i.imgur.com/8j2npVc.png",                                                                                                               url:"https://dz05z8iljgvbe.cloudfront.net/master.m3u8" },
  { id:"tv85", name:"GREAT! movies",    logo:"https://d2n0069hmnqmmx.cloudfront.net/epgdata/1.0/newchanlogos/512/512/skychb3709.png",                                                         url:"https://amg01753-narrativeuk-amg01753c3-lg-gb-1833.playouts.now.amagi.tv/playlist/amg01753-narrativeuk-greatmovies-lggb/playlist.m3u8" },
  { id:"tv86", name:"All Time Movies",  logo:"https://yt3.googleusercontent.com/U4INXhwmEUOABHoemQBpI6C9t4jb9iBmDvZ3ZT3lAb9Au_jVl32NL8XDpy-9cBjRJ2LP69Ovzg=s900-c-k-c0x00ffffff-no-rj", url:"https://mumt03.tangotv.in/ALLTIMEMOVIES/index.m3u8" },
  { id:"tv81", name:"INWILD",           logo:"https://cdn.uc.assets.prezly.com/92770c71-9d6f-400f-8311-38e9cfec52c2/InWild_landscape-green.png",                                              url:"https://amg00861-terninternation-inwild-samsunguk-w5wic.amagi.tv/playlist/amg00861-terninternation-inwild-samsunguk/playlist.m3u8" },
  { id:"tv82", name:"InWonder",         logo:"https://cdn.uc.assets.prezly.com/f12e798d-6da4-46e1-8ec5-e391d6762659/InWonder_portrait-purple.png",                                            url:"https://amg00861-terninternation-inwonder-samsungau-1k63k.amagi.tv/playlist/amg00861-terninternation-inwonder-samsungau/playlist.m3u8" },
  { id:"tv83", name:"Animax Asia",      logo:"https://jiotvimages.cdn.jio.com/dare_images/images/Animax.png",                                                                                 url:"https://amg02159-kcglobal-amg02159c1-samsung-in-521.playouts.now.amagi.tv/playlist/amg02159-kcglobal-animax-samsungin/playlist.m3u8" },
  { id:"tv84", name:"Zee South Flix",   logo:"https://d3bd0tgyk368z1.cloudfront.net/zeelg/LG%20logo%20artwork/400x200/zsouthflix.png",                                                        url:"https://amg00862-amg00862c9-amgplt0173.playout.now3.amagi.tv/playlist/amg00862-amg00862c9-amgplt0173/playlist.m3u8" },
  /* FIFA World Cup 2026 Broadcasters — verified live */
  { id:"tv88", name:"ARD Das Erste",    logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/ARD_Dachmarke_2014.svg/960px-ARD_Dachmarke_2014.svg.png",                              url:"https://s6.hopslan.com/ardX/tracks-v1a1/mono.m3u8" },
  { id:"tv89", name:"RTVE La 1",        logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/La_1_2026.svg/500px-La_1_2026.svg.png",                                                url:"https://ztnr.rtve.es/ztnr/1688877.m3u8" },
  { id:"tv90", name:"Rede Globo",       logo:"https://i.imgur.com/O02TF2r.png",                                                                                                                url:"http://hls1.sua.tv/live/globotvbahiafhdbr2/s.m3u8" },
  { id:"tv91", name:"Qazaqstan TV",     logo:"https://i.imgur.com/oI8g396.png",                                                                                                                url:"https://qazaqstantv-stream.qazcdn.com/qazaqstantv/qazaqstantv/playlist.m3u8" },
  { id:"tv92", name:"Futbol TV",        logo:"https://i.imgur.com/RngmCDn.png",                                                                                                                url:"https://live.teleradiocom.tj/8/3m.m3u8" },
  { id:"tv93", name:"Zo'r TV",          logo:"https://i.imgur.com/NuzyhVM.png",                                                                                                                url:"https://stream8.cinerama.uz/1016/tracks-v1a1/mono.m3u8" },
  { id:"tv94", name:"Turkmenistan Sport",logo:"https://i.imgur.com/n6vITLu.png",                                                                                                               url:"https://alpha.tv.online.tm/hls/ch004.m3u8", proxy:true },
  { id:"tv95", name:"BTV National",     logo:"https://i.imgur.com/5OE2FDt.png",                                                                                                                url:"https://owrcovcrpy.gpcdn.net/bpk-tv/1709/output/1709.m3u8" },
  { id:"tv96", name:"Somoy TV",         logo:"https://i.imgur.com/i54AQic.png",                                                                                                                url:"https://owrcovcrpy.gpcdn.net/bpk-tv/1702/output/index.m3u8" },
];

/* ===== Radio Station Data ===== */
const STATIONS = [
  { id: 1, name: "Radio Mirchi 98.3",   freq: "98.3 MHz",  region: "Chennai", cat: "india", url: "http://radios.crabdance.com:8002/1" },
  { id: 2, name: "Suryan FM 93.5",      freq: "93.5 MHz",  region: "Chennai", cat: "india", url: "http://radios.crabdance.com:8002/2" },
  { id: 3, name: "Hello FM 106.4",      freq: "106.4 MHz", region: "Chennai", cat: "india", url: "http://radios.crabdance.com:8002/3" },
  { id: 4, name: "Big FM 92.7",         freq: "92.7 MHz",  region: "Chennai", cat: "india", url: "http://radios.crabdance.com:8002/4" },
  { id: 5, name: "Radio City 91.1",     freq: "91.1 MHz",  region: "Chennai", cat: "india", url: "http://radios.crabdance.com:8002/5" },
  { id: 6, name: "AIR FM Gold Chennai", freq: "101.4 MHz", region: "Chennai", cat: "india", url: "https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio005/hlspbaudio00564kbps.m3u8" },
  { id: 7, name: "AIR Rainbow Chennai", freq: "101.9 MHz", region: "Chennai", cat: "india", url: "https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio004/hlspbaudio00464kbps.m3u8" },
];

/* ===== DOM Refs ===== */
const grid          = document.getElementById("stationGrid");
const tvGrid        = document.getElementById("tvGrid");
const emptyState    = document.getElementById("emptyState");
const searchInput   = document.getElementById("searchInput");
const tabsEl        = document.getElementById("tabs");
const audio         = document.getElementById("audioEl");
const playBtn       = document.getElementById("playBtn");
const prevBtn       = document.getElementById("prevBtn");
const nextBtn       = document.getElementById("nextBtn");
const volumeEl      = document.getElementById("volumeSlider");
const playerStation = document.getElementById("playerStation");
const playerFreq    = document.getElementById("playerFreq");
const visualizer    = document.getElementById("visualizer");
const themeToggle   = document.getElementById("themeToggle");
const tvModal       = document.getElementById("tvModal");
const tvVideo       = document.getElementById("tvVideo");
const tvModalName   = document.getElementById("tvModalName");
const tvModalClose  = document.getElementById("tvModalClose");

/* ===== State ===== */
let currentStation = null;
let currentCat     = "radio";
let isPlaying      = false;
let isLoading      = false;
let filteredList   = [...STATIONS];
const offlineIds   = new Set();
let hlsInstance    = null;
let tvHlsInstance  = null;
let currentTV      = null;

/* ===== Theme ===== */
function initTheme() {
  const saved = localStorage.getItem("radio-theme");
  if (saved === "light") document.documentElement.setAttribute("data-theme", "light");
}
initTheme();

themeToggle.addEventListener("click", () => {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  if (isLight) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("radio-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("radio-theme", "light");
  }
});

/* ===== Radio Render ===== */
function getInitials(name) {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("");
}

function renderStations() {
  const query = searchInput.value.toLowerCase().trim();
  filteredList = STATIONS.filter(s => {
    const matchesCat    = currentCat === "radio" || s.cat === currentCat;
    const matchesSearch = !query || s.name.toLowerCase().includes(query) || s.region.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  if (filteredList.length === 0) {
    grid.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }
  emptyState.style.display = "none";

  grid.innerHTML = filteredList.map(s => {
    const isActive  = currentStation && currentStation.id === s.id;
    const isOffline = offlineIds.has(s.id);
    return `
    <div class="station-card${isActive ? " active" : ""}${isOffline ? " offline" : ""}" data-id="${s.id}">
      <div class="station-avatar">${getInitials(s.name)}</div>
      <div class="station-details">
        <p class="station-name">${s.name}</p>
        <div class="station-region"><span>${s.region}</span><span class="dot"></span><span>${s.freq}</span></div>
        <div class="station-live"><span class="live-dot"></span> LIVE</div>
        <div class="station-offline"><span class="offline-dot"></span> OFFLINE</div>
      </div>
    </div>`;
  }).join("");

  grid.querySelectorAll(".station-card").forEach(card => {
    card.addEventListener("click", () => {
      const station = STATIONS.find(s => s.id === parseInt(card.dataset.id));
      if (station) selectStation(station);
    });
  });
}

/* ===== TV Render ===== */
function renderTV() {
  const query = searchInput.value.toLowerCase().trim();
  const list  = TV_CHANNELS.filter(c => !query || c.name.toLowerCase().includes(query));

  tvGrid.innerHTML = list.map(c => `
    <div class="tv-card" data-tvid="${c.id}">
      <div class="tv-logo-wrap">
        <img class="tv-logo" src="${c.logo}" alt="${c.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="tv-logo-fallback" style="display:none">${getInitials(c.name)}</div>
      </div>
      <div class="tv-info">
        <p class="tv-name">${c.name}</p>
        <div class="station-live"><span class="live-dot"></span> LIVE</div>
      </div>
      <div class="tv-play-icon">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M8 5v14l11-7z"/></svg>
      </div>
    </div>`).join("");

  tvGrid.querySelectorAll(".tv-card").forEach(card => {
    card.addEventListener("click", () => {
      const ch = TV_CHANNELS.find(c => c.id === card.dataset.tvid);
      if (ch) openTVPlayer(ch);
    });
  });
}

/* ===== TV Player ===== */
let tvDashInstance = null;

function resolveStreamUrl(url, forceProxy) {
  if (CORS_PROXY && (url.startsWith("http://") || forceProxy)) {
    return CORS_PROXY + "/?url=" + encodeURIComponent(url);
  }
  return url;
}

function openTVPlayer(channel) {
  currentTV = channel;
  tvModalName.textContent = channel.name;
  tvModal.classList.add("open");
  document.body.style.overflow = "hidden";

  if (tvHlsInstance) { tvHlsInstance.destroy(); tvHlsInstance = null; }
  if (tvDashInstance) { tvDashInstance.destroy(); tvDashInstance = null; }

  const streamUrl = resolveStreamUrl(channel.url, channel.proxy);

  if ((channel.url.startsWith("http://") || channel.proxy) && !CORS_PROXY) {
    tvModalName.textContent = channel.name + " — needs proxy";
    tvVideo.src = "";
    return;
  }

  const isDash = streamUrl.endsWith(".mpd");

  if (isDash) {
    tvDashInstance = dashjs.MediaPlayer().create();
    tvDashInstance.initialize(tvVideo, streamUrl, true);
  } else if (Hls.isSupported()) {
    tvHlsInstance = new Hls({ lowLatencyMode: true });
    tvHlsInstance.loadSource(streamUrl);
    tvHlsInstance.attachMedia(tvVideo);
    tvHlsInstance.on(Hls.Events.MANIFEST_PARSED, () => tvVideo.play().catch(() => {}));
  } else if (tvVideo.canPlayType("application/vnd.apple.mpegurl")) {
    tvVideo.src = streamUrl;
    tvVideo.play().catch(() => {});
  }
}

function closeTVPlayer() {
  tvModal.classList.remove("open");
  document.body.style.overflow = "";
  tvVideo.pause();
  tvVideo.src = "";
  if (tvHlsInstance) { tvHlsInstance.destroy(); tvHlsInstance = null; }
  if (tvDashInstance) { tvDashInstance.destroy(); tvDashInstance = null; }
  currentTV = null;
}

tvModalClose.addEventListener("click", closeTVPlayer);
tvModal.addEventListener("click", e => { if (e.target === tvModal) closeTVPlayer(); });

/* ===== Tab Switching ===== */
function setView(cat) {
  currentCat = cat;
  const isTV = cat === "tv";
  grid.style.display      = isTV ? "none" : "";
  tvGrid.style.display    = isTV ? "grid" : "none";
  emptyState.style.display = "none";
  searchInput.placeholder = isTV ? "Search channels..." : "Search stations...";
  if (isTV) renderTV();
  else      renderStations();
}

tabsEl.addEventListener("click", e => {
  const tab = e.target.closest(".tab");
  if (!tab) return;
  tabsEl.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  tab.classList.add("active");
  setView(tab.dataset.cat);
});

/* ===== Station Selection ===== */
function selectStation(station) {
  const isSame = currentStation && currentStation.id === station.id;
  const isOff  = offlineIds.has(station.id);
  if (isSame && !isOff) { togglePlay(); return; }

  currentStation = station;
  playerStation.textContent = station.name;
  playerStation.classList.remove("has-error");
  playerFreq.textContent = station.region + " · " + station.freq;
  loadStream(station.url);
  renderStations();
}

/* ===== Stream Loader ===== */
function loadStream(url) {
  if (hlsInstance) { hlsInstance.destroy(); hlsInstance = null; }
  if (url.endsWith(".m3u8") && Hls.isSupported()) {
    hlsInstance = new Hls({ lowLatencyMode: true });
    hlsInstance.loadSource(url);
    hlsInstance.attachMedia(audio);
    hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => playStream());
    hlsInstance.on(Hls.Events.ERROR, (_, data) => {
      if (data.fatal) { setLoading(false); markCurrentOffline(); }
    });
  } else {
    audio.src = url;
    audio.load();
    playStream();
  }
}

/* ===== Playback ===== */
function playStream() {
  setLoading(true);
  setError(false);
  audio.play().then(() => {
    setLoading(false);
    setPlaying(true);
    if (currentStation) offlineIds.delete(currentStation.id);
  }).catch(() => {
    setLoading(false);
    setPlaying(false);
    markCurrentOffline();
  });
}

function markCurrentOffline() {
  if (!currentStation) return;
  offlineIds.add(currentStation.id);
  setError(true);
  renderStations();
}

function setError(val) {
  playerStation.classList.toggle("has-error", val);
  if (val && currentStation) playerFreq.textContent = "Stream unavailable — tap to retry";
}

function togglePlay() {
  if (!currentStation) return;
  if (audio.paused) {
    if (hlsInstance) playStream();
    else loadStream(currentStation.url);
  } else {
    audio.pause();
    setPlaying(false);
  }
}

function setPlaying(val) {
  isPlaying = val;
  playBtn.classList.toggle("is-playing", val);
  visualizer.classList.toggle("playing", val);
}

function setLoading(val) {
  isLoading = val;
  playBtn.classList.toggle("is-loading", val);
}

/* ===== Audio Events ===== */
audio.addEventListener("playing", () => {
  setLoading(false); setPlaying(true); setError(false);
  if (currentStation) {
    offlineIds.delete(currentStation.id);
    playerFreq.textContent = currentStation.region + " · " + currentStation.freq;
    renderStations();
  }
});
audio.addEventListener("waiting", () => setLoading(true));
audio.addEventListener("pause",   () => setPlaying(false));
audio.addEventListener("error",   () => { setLoading(false); setPlaying(false); markCurrentOffline(); });

/* ===== Controls ===== */
playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => {
  if (!currentStation) return;
  const idx  = filteredList.findIndex(s => s.id === currentStation.id);
  selectStation(idx > 0 ? filteredList[idx - 1] : filteredList[filteredList.length - 1]);
});
nextBtn.addEventListener("click", () => {
  if (!currentStation) return;
  const idx  = filteredList.findIndex(s => s.id === currentStation.id);
  selectStation(idx < filteredList.length - 1 ? filteredList[idx + 1] : filteredList[0]);
});
volumeEl.addEventListener("input", () => { audio.volume = volumeEl.value / 100; });
audio.volume = 0.8;

searchInput.addEventListener("input", () => {
  if (currentCat === "tv") renderTV();
  else renderStations();
});

playerFreq.addEventListener("click", () => {
  if (currentStation && playerFreq.textContent.includes("retry")) {
    offlineIds.delete(currentStation.id);
    selectStation(currentStation);
  }
});

document.addEventListener("keydown", e => {
  if (e.target.tagName === "INPUT") return;
  if (e.key === "Escape") { closeTVPlayer(); closeCommunity(); }
  if (e.code === "Space" && currentCat !== "tv") { e.preventDefault(); togglePlay(); }
  if (e.code === "ArrowRight") nextBtn.click();
  if (e.code === "ArrowLeft")  prevBtn.click();
});

/* ===== Community Voice (Jitsi iframe) ===== */
const communityBtn   = document.getElementById("communityBtn");
const communityModal = document.getElementById("communityModal");
const communityClose = document.getElementById("communityClose");
const jitsiContainer = document.getElementById("jitsiContainer");

const JITSI_SRC = "https://meet.jit.si/TamilRadioCommunity2024"
  + "#config.startWithVideoMuted=true"
  + "&config.startWithAudioMuted=false"
  + "&config.prejoinPageEnabled=false"
  + "&config.toolbarButtons=[%22microphone%22,%22hangup%22,%22participants-pane%22]"
  + "&interfaceConfig.SHOW_JITSI_WATERMARK=false"
  + "&interfaceConfig.TOOLBAR_ALWAYS_VISIBLE=true";

function openCommunity() {
  communityModal.classList.add("open");
  communityModal.setAttribute("aria-hidden", "false");
  communityBtn.classList.add("active");
  if (jitsiContainer.querySelector("iframe")) return;
  const iframe = document.createElement("iframe");
  iframe.src = JITSI_SRC;
  iframe.allow = "camera; microphone; fullscreen; display-capture; autoplay";
  iframe.setAttribute("allowfullscreen", "true");
  jitsiContainer.appendChild(iframe);
}

function closeCommunity() {
  communityModal.classList.remove("open");
  communityModal.setAttribute("aria-hidden", "true");
  communityBtn.classList.remove("active");
  jitsiContainer.innerHTML = "";
}

communityBtn.addEventListener("click", openCommunity);
communityClose.addEventListener("click", closeCommunity);
communityModal.addEventListener("click", e => { if (e.target === communityModal) closeCommunity(); });

/* ===== Live Listener Count (MQTT presence) ===== */
const listenerBadge = document.getElementById("listenerBadge");
const listenerCount = document.getElementById("listenerCount");
const SESSION_ID    = Math.random().toString(36).slice(2, 11);
const MQTT_TOPIC    = "tamil-radio-app-v1/listeners/";
const STALE_MS      = 90000;
const activeListeners = new Map();
let mqttClient = null;

function updateBadge() {
  const now = Date.now();
  for (const [id, ts] of activeListeners) { if (now - ts > STALE_MS) activeListeners.delete(id); }
  const n = activeListeners.size;
  listenerCount.textContent = n;
  listenerBadge.style.display = n > 0 ? "inline-flex" : "none";
}

function publishPresence(alive = true) {
  if (!mqttClient || !mqttClient.connected) return;
  mqttClient.publish(MQTT_TOPIC + SESSION_ID, JSON.stringify({ alive }), { qos: 0, retain: false });
}

function initPresence() {
  mqttClient = mqtt.connect("wss://broker.hivemq.com:8884/mqtt", {
    clientId: "tamilradio_" + SESSION_ID,
    clean: true, reconnectPeriod: 8000, connectTimeout: 10000,
  });
  mqttClient.on("connect", () => { mqttClient.subscribe(MQTT_TOPIC + "+"); publishPresence(true); });
  mqttClient.on("message", (topic, msg) => {
    try {
      const sid = topic.split("/").pop();
      const data = JSON.parse(msg.toString());
      if (data.alive) activeListeners.set(sid, Date.now());
      else            activeListeners.delete(sid);
      updateBadge();
    } catch (_) {}
  });
  setInterval(() => publishPresence(true), 30000);
  setInterval(updateBadge, 15000);
  window.addEventListener("beforeunload", () => publishPresence(false));
}

initPresence();

/* ===== Init ===== */
setView("radio");
