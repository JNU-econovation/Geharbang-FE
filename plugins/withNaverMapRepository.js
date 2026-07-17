const { withProjectBuildGradle } = require("@expo/config-plugins");

const NAVER_MAP_MAVEN_REPOSITORY =
  "maven { url 'https://repository.map.naver.com/archive/maven' }";

function addNaverMapRepository(buildGradle) {
  if (buildGradle.includes(NAVER_MAP_MAVEN_REPOSITORY)) {
    return buildGradle;
  }

  return buildGradle.replace(
    /allprojects\s*\{\s*repositories\s*\{/,
    (match) => `${match}\n        ${NAVER_MAP_MAVEN_REPOSITORY}`
  );
}

module.exports = function withNaverMapRepository(config) {
  return withProjectBuildGradle(config, (config) => {
    config.modResults.contents = addNaverMapRepository(
      config.modResults.contents
    );

    return config;
  });
};
