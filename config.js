// Medha settings.
//
// ACCESS CODES
// Only teachers you approve can use Medha. Each line below is the fingerprint of one access code;
// the codes themselves are in your private register (Medha-Access-Codes.xlsx), not here.
// To block a teacher: delete the whole line that ends with their number (for example // 07) and commit.
// Their Medha stops working the next time it opens with internet.
// Students never need a code: the notes files you send them always open.
//
// Classes and sign-in (Supabase) are switched off; set enableClasses to true only after the README setup.
// Use the PUBLISHABLE key (starts with sb_publishable_). Never paste the SECRET key here.
window.MEDHA_CONFIG = {
  access: {
    required: true,
    contact: "Dr. Bipul Das · bipul@mech.nits.ac.in",
    codes: [
      "db531cd05706b795b3f09e8c9bae08232dfda33bd9225bb68cf8f354d37b1e7b",  // 01
      "8f7b27a2210683f4ae94720d1595c339564797becc304b5c5c02fddda8207794",  // 02
      "02b6da5a5c3ceb3c46e774bfc29b0202a470c7f1cb8d5099ab32b58c6cd579a3",  // 03
      "84276670e64e6211a08e14b6b5ee89f189564c33abe4993851e9bba17cb61029",  // 04
      "9861abb04c114f624bc8c01175fd4c7f5cf974d3abdfacde492bcacfdaf63e45",  // 05
      "2890bd3838f4a1df371163e8d231436d8f0065d0382a9ea5aebca4483628bd7c",  // 06
      "e7936e3f848224f3b045a2adace1ce0b03aebc75a09d226d62940a82ca1eaa04",  // 07
      "0048dfd2d4e3fe0daed0286c083de302f59b1ae9bfa4647ba596df752fec8adf",  // 08
      "eed0384d373db3421ab455c5c7c2f96496a3caf21af06481a324bbc32658f41c",  // 09
      "4b4410bf117f312ddfee5dd1f93a99251ca07cdafb49e6f09f03a60cbd1041ff",  // 10
      "ae2f90ae84882e6ad71cfe7f3ac53d2306eb2943d9c029f1a8c91a98db79cec3",  // 11
      "15245e3ee15c249f474eb7f7a7fa8fa2752a95dc3a762754049c90425df42cdb",  // 12
      "5702e3d2760caaca8d970edf009eae830a200d3f906963b672f0a51422ec850a",  // 13
      "1e22edebf3601ebdac8ecfee606caaa1508ae84fde5663d7050306d9f699d064",  // 14
      "1b747c7e30a5b94eeda7dacd4e7b76e82db89e521f1ef4dcd3e37cc9d9a12543",  // 15
      "8a7500bd1f294f902cc3b0e561bb73e932a11596b6f3bc54b0dc3f2d107bcf4e",  // 16
      "d758f0eb19c482522d028d8abdbd73fbd98f5ff46fc8fa30a3b0a1a03ecbeebe",  // 17
      "eccceeb8900c8466b58654e74f1d84e825729cb854ec8828c58e9c68fa984a45",  // 18
      "02d8a2549a09a368eb82ead95f900c3b76c66558c6762d52755ef0e33cbf7935",  // 19
      "94eb67380a0d18075ad2553537cb07c0837afa261b4cc8354267ee673d5928da",  // 20
      "83b6d4a230c9d1c14eb5c24e145bf5bad9a8f8cb06db22eff0559cc2bea0ff00",  // 21
      "717225402ddd7c3c63fac5f2434e7c5b87dd7d4a23a703d14d53d0466e2281fb",  // 22
      "7e189fd1321aeb9639b3385290671417b16a8a4e7ceedeba46479bf5fa4306aa",  // 23
      "ea20e472a29896983ecb00b9e4c67470881886253431e1ca3a87eee2b20af0c2",  // 24
      "8244e76d0c84b1f43557ce0ce7d996a9e65124c67856c41147f27464ca17a74e",  // 25
      "4c23aabec094393f518dba626ce700a18354f148bd9470491eea50abfe5a5fa3",  // 26
      "b5b83e118cba8989fb6629326a72e11b26a5f51f3841e8ea9269ccecc6295fdc",  // 27
      "e64c70e8090f8f89ee742429c849d679e3c4a9f0c25cf1b39f90aef5ec2ca411",  // 28
      "156b8d2884121128790fe5957652f974fe743ebb1049cfcfd7f8d0a65b83b586",  // 29
      "a26f698de16bd113606733e24775bcb3c396da81faf038feb093aab83c4608e7",  // 30
      "eeaaa455ca8632be9baa827343bf0158703f3e5a9c3620b4ef75075e6def4031",  // 31
      "6cf0b538cca1b3116bd2c8d414b97f2efefbceb8d83a2508d181c60450cd2e85",  // 32
      "b9909122ed275ad82514e91bfaaea1af271e047a8f4c045dc9f6eb7a8b790bf7",  // 33
      "16b6dd1f3e7c15c3f0d2d6621bf7a5c0647da27d2b3c1ebfc5ffceee6d8be99a",  // 34
      "cf34235390625ef024a5ef9a45bf789b557411c674b1ec26292a79d59ed14165",  // 35
      "5277c2d39f317bbfab63e85b9f28894eeb5ef13d6b0c7cf34e400a9f1cfa7194",  // 36
      "ffc6c35a94b8cb0f762a682919e9bf515cfd2eb78dea1e1168db09446b8577db",  // 37
      "56571eb0834b3180500f4d750a67c4d743677b69acd96e381e5cd822c3e72405",  // 38
      "f33c81e3bb6fe322abb3c67fe1b8388264db3287f258b1c9c57c6df1a399eed4",  // 39
      "1907d9e3fd1e9633eac6368a80a92bcfb8091e0df5e475dd756419ad0cb492ea",  // 40
      "db1b50aaac123016d80c69abed61c8750dc6a0c4e24225a55878be38c258cf73",  // 41
      "6432de7dcf10286df7a59c6456e0934e155b1df42a647b3f0e68009bb4ec6604",  // 42
      "4a3bd17243c3ea20af96c677b0902f422eaa8dcacc198cb5459efacda8ab7193",  // 43
      "85902319827f9dcd5f6cd5800523fa27af1db5c9dc8984b94c85918aa82143c4",  // 44
      "81375b29e429cabcb683aa14ddb10a5123b444cf9ccc0a82112de6cc08f82dcb",  // 45
      "a25910d89856d8601892e0f3bc726a5c189a2d66a02cda577fe991f129190778",  // 46
      "954e9b7b573d09352b238628c168e10d8436a22d46d9e88c09e8ca5612b7ed5f",  // 47
      "729fb996857fc7dc1497fe0c3feb1909010e12a01e650bffff6c58fdfb173b5d",  // 48
      "49801eb455b544863f2c7215586111c30204c8df1255f753f44dce30d45e8246",  // 49
      "26e9a081f7cfaa980ee38cd6783de2dcdbf4982808345091d4b053db7f981c1c",  // 50
    ]
  },
  enableClasses: false,
  supabaseUrl: "https://rhsvetbzhflehhdxqmuw.supabase.co",
  supabaseAnonKey: "sb_publishable_G7gECcKfgR-ks_XLqzSxeg_YBurZuKp"
};
