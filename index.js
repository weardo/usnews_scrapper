const axios = require("axios");
// const scripts = require('script-tags');
// const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// function wait(ms){
//   return new Promise((resolve, reject) => {
//     start = new Date().getTime();
//     var end = start;
//     while(end < start + ms) {
//       end = new Date().getTime();
//     }
//     resolve('waited ' + ms + ' ms');
//   })
// }

const uni_list_header = [
  {id: 'id', title: 'id'},
  {id: 'url', title: 'url'},
  {id: 'name', title: 'name'},
  {id: 'city', title: 'city'},
  {id: 'country_name', title: 'country_name'},
  {id: 'three_digit_country_code', title: 'three_digit_country_code'},
  {id: 'global_rank_value', title: 'global_rank_values'},
  {id: 'is_tied', title: 'is_ranked'},
  {id: 'is_ranked', title: 'is_tied'},
  {id: 'global_score', title: 'global_score'},
  {id: 'enrollment', title: 'enrollment'}
];

const uni_details_header = [
  {id: 'institution_id', title: 'institution_id'},
  {id: 'index', title: 'index'},
  {id: 'institution_name', title: 'institution_name'},
  {id: 'street_address', title: 'street_address'},
  {id: 'city', title: 'city'},
  {id: 'country_subdivision', title: 'country_subdivision'},
  {id: 'postal_code', title: 'postal_code'},
  {id: 'country', title: 'country'},
  {id: 'country_code', title: 'country_code'},
  {id: 'region', title: 'region'},
  {id: 'website', title: 'website'},
  {id: 'latitude', title: 'latitude'},
  {id: 'longitude', title: 'longitude'},
  {id: 'overall_score', title: 'overall_score'},
  {id: 'overall_rank', title: 'overall_rank'},
  {id: 'reputation_global_rank', title: 'reputation_global_rank'},
  {id: 'reputation_local_rank', title: 'reputation_local_rank'},
  {id: 'papers_rank', title: 'papers_rank'},
  {id: 'books_rank', title: 'books_rank'},
  {id: 'citations_rank', title: 'citations_rank'},
  {id: 'research_power_rank', title: 'research_power_rank'},
  {id: 'collaboration_rank', title: 'collaboration_rank'},
  {id: 'highly_cited_proportion_rank', title: 'highly_cited_proportion_rank'},
  {id: 'regional_rank', title: 'regional_rank'},
  {id: 'country_rank', title: 'country_rank'},
  {id: 'conference_rank', title: 'conference_rank'},
  {id: 'street_address_line_2', title: 'street_address_line_2'},
  {id: 'total_acad_staff', title: 'total_acad_staff'},
  {id: 'num_acad_staff_intl', title: 'num_acad_staff_intl'},
  {id: 'total_students', title: 'total_students'},
  {id: 'num_intl_students', title: 'num_intl_students'},
  {id: 'ug_degrees', title: 'ug_degrees'},
  {id: 'master_degrees', title: 'master_degrees'},
  {id: 'phd_degrees', title: 'phd_degrees'},
  {id: 'res_staff', title: 'res_staff'},
  {id: 'ug_intake', title: 'ug_intake'},
  {id: 'mstrs_intake', title: 'mstrs_intake'},
  {id: 'phd_intake', title: 'phd_intake'},
  {id: 'is_tied_global', title: 'is_tied_global'},
  {id: 'is_tied_regional', title: 'is_tied_regional'},
  {id: 'is_tied_country', title: 'is_tied_country'},
  {id: 'keyword', title: 'keyword'}
];

const uni_subject_rank_header = [
  
  {id: 'institution_id', title: 'institution_id'},
  {id: 'institution_name', title: 'institution_name'},
  {id: 'country', title: 'country'},
  {id: 'region', title: 'region'},
  {id: 'website', title: 'website'},
  {id: 'agriculture', title: 'Agricultural Sciences'},
  {id: 'arts_humanities', title: 'Arts and Humanities'},
  {id: 'biology_biochem', title: 'Biology and Biochemistry'},
  {id: 'biotechnology_applied_microbiology', title: 'Biotechnology and Applied Microbiology'},
  {id: 'cardiac_and_cardiovascular', title: 'Cardiac and Cardiovascular Systems'},
  {id: 'cell_biology', title: 'Cell Biology'},
  {id: 'chemical_engineering', title: 'Chemical Engineering'},
  {id: 'chemistry', title: 'Chemistry'},
  {id: 'civil_engineering', title: 'Civil Engineering'},
  {id: 'clinical_med', title: 'Clinical Medicine'},
  {id: 'computer_sci', title: 'Computer Science'},
  {id: 'econ_bus', title: 'Economics and Business'},
  {id: 'elec_electronic_eng', title: 'Electrical and Electronic Engineering'},
  {id: 'endocrinology_metabolism', title: 'Endocrinology and Metabolism'},
  {id: 'energy_fuels', title: 'Energy and Fuels'},
  {id: 'engineering', title: 'Engineering'},
  {id: 'env_eco', title: 'Environment/Ecology'},
  {id: 'gastroenterology_hepatology', title: 'Gastroenterology and Hepatology'},
  {id: 'geosciences', title: 'Geosciences'},
  {id: 'immunology', title: 'Immunology'},
  {id: 'infectious_diseases', title: 'Infectious Diseases'},
  {id: 'materials', title: 'Materials Science'},
  {id: 'mathematics', title: 'Mathematics'},
  {id: 'mechanical_engineering', title: 'Mechanical Engineering'},
  {id: 'microbiology', title: 'Microbiology'},
  {id: 'molecular_biology_genetics', title: 'Molecular Biology and Genetics'},
  {id: 'nanoscience_nanotechnology', title: 'Nanoscience and Nanotechnology'},
  {id: 'neuroscience', title: 'Neuroscience and Behavior'},
  {id: 'oncology', title: 'Oncology'},
  {id: 'pharma_toxicology', title: 'Pharmacology and Toxicology'},
  {id: 'physics', title: 'Physics'},
  {id: 'plant_animal', title: 'Plant and Animal Science'},
  {id: 'psychiatry_psychology', title: 'Psychiatry/Psychology'},
  {id: 'public_environmental_occupational_health', title: 'Public, Environmental and Occupational Health'},
  {id: 'radiology_nuclear_medicine_medical_imaging', title: 'Radiology, Nuclear Medicine and Medical Imaging'},
  {id: 'social_sciences', title: 'Social Sciences and Public Health'},
  {id: 'space_science', title: 'Space Science'},
  {id: 'surgery', title: 'Surgery'}
]


async function getUniList(){
  try{

    var total_count = 9999999;
    var total_pages = 5;
    var current_page = 1;
    var uni_list = [];

    for( current_page; current_page <= total_pages; current_page++){
      page_url = "https://www.usnews.com/education/best-global-universities/search?format=json&page=" + current_page;
      console.log('fetching page: [' + (current_page) + ' / ' + (total_pages) + ']' + page_url); 
      try{
        uni_list = await axios.get(page_url)
          .then((response) => {
                    total_count = response.data.total_count;
                    // total_pages = response.data.total_pages;
                    current_page = response.data.current_page;
                
                    const items = response.data.items;
                
                    items.forEach(function(i) {
                      
                      uni_list.push({
                        id: i.id, 
                        url: i.url, 
                        name: i.name, 
                        city: i.city, 
                        country_name: i.country_name, 
                        three_digit_country_code: i.three_digit_country_code, 
                        global_rank_value: i.ranks[0].value, 
                        is_tied: i.ranks[0].is_tied, 
                        is_ranked: i.ranks[0].is_ranked, 
                        global_score: i.stats[0].value, 
                        enrollment: i.stats[0].value
                      });
                    });

                    return uni_list;
                })
                .catch(err => console.error(err));
      }catch(err) {
        console.log(err);
      }
    }

    if(uni_list.length > 0) {
      return uni_list;
    }else{
      return Promise.reject('uni_list.length: ' + uni_list.length + ' at the end');
    }
  }catch(err) {
    console.log(err);
    return Promise.reject(err);
  }
}

async function getUniDetailsList(uni_list){
  try{
    var total_unis = uni_list.length-1;
    var current_uni = 0;
    var uni_details_list = [];
    var uni_subject_rank_list = [];
    var uni_subject_reputation_global_rank_list = [];
    var uni_subject_reputation_local_rank_list = [];

    for( current_uni; current_uni <= total_unis; current_uni++){
      page_url = uni_list[current_uni].url + '?format=json';
      console.log('fetching university: [' + (current_uni+1) + ' / ' + (total_unis+1) + ']' + page_url); 
      try{
        ({uni_details_list, uni_subject_rank_list, uni_subject_reputation_global_rank_list, uni_subject_reputation_local_rank_list} = await axios.get(page_url)
          .then((response) => {
            const uni = response.data;     
            var uni_details = {
              institution_id: uni.profile.institution_id, 
              index: uni.profile.index, 
              institution_name: uni.profile.institution_name, 
              street_address: uni.profile.street_address, 
              city: uni.profile.city, 
              country_subdivision: uni.profile.country_subdivision, 
              postal_code: uni.profile.postal_code, 
              country: uni.profile.country, 
              country_code: uni.profile.country_code, 
              region: uni.profile.region, 
              website: uni.profile.website,
              latitude: uni.profile.latitude,
              longitude: uni.profile.longitude,
              overall_score: uni.profile.overall_score,
              overall_rank: uni.profile.overall_rank,
              reputation_global_rank: uni.profile.reputation_global_rank,
              reputation_local_rank: uni.profile.reputation_local_rank,
              papers_rank: uni.profile.papers_rank,
              books_rank: uni.profile.books_rank,
              citations_rank: uni.profile.citations_rank,
              research_power_rank: uni.profile.research_power_rank,
              collaboration_rank: uni.profile.collaboration_rank,
              highly_cited_proportion_rank: uni.profile.highly_cited_proportion_rank,
              regional_rank: uni.profile.regional_rank,
              country_rank: uni.profile.country_rank,
              conference_rank: uni.profile.conference_rank,
              street_address_line_2: uni.profile.street_address_line_2,
              total_acad_staff: uni.profile.total_acad_staff,
              num_acad_staff_intl: uni.profile.num_acad_staff_intl,
              total_students: uni.profile.total_students,
              num_intl_students: uni.profile.num_intl_students,
              ug_degrees: uni.profile.ug_degrees,
              master_degrees: uni.profile.master_degrees,
              phd_degrees: uni.profile.phd_degrees,
              res_staff: uni.profile.res_staff,
              ug_intake: uni.profile.ug_intake,
              mstrs_intake: uni.profile.mstrs_intake,
              phd_intake: uni.profile.phd_intake,
              is_tied_global: uni.profile.is_tied_global,
              is_tied_regional: uni.profile.is_tied_regional,
              is_tied_country: uni.profile.is_tied_country,
              keyword: uni.profile.keyword,
            };

            var uni_subject_rank, uni_subject_reputation_global_rank, uni_subject_reputation_local_rank;

            uni_subject_rank = {
              institution_id: uni.profile.institution_id,
              institution_name: uni.profile.institution_name, 
              country: uni.profile.country, 
              region: uni.profile.region,
              website: uni.profile.website
            };
            uni_subject_reputation_global_rank = {
              institution_id: uni.profile.institution_id,
              institution_name: uni.profile.institution_name, 
              country: uni.profile.country, 
              region: uni.profile.region,
              website: uni.profile.website
            };
            uni_subject_reputation_local_rank = {
              institution_id: uni.profile.institution_id,
              institution_name: uni.profile.institution_name, 
              country: uni.profile.country, 
              region: uni.profile.region,
              website: uni.profile.website
            };

            uni.subjects.forEach(function(s){
              uni_subject_rank[s.subject_id_string]=s.subject_rank;
              uni_subject_reputation_global_rank[s.subject_id_string]=s.subject_reputation_global_rank;
              uni_subject_reputation_local_rank[s.subject_id_string]=s.subject_reputation_local_rank;
            });

            uni_details_list.push(uni_details);
            uni_subject_rank_list.push(uni_subject_rank);
            uni_subject_reputation_global_rank_list.push(uni_subject_reputation_global_rank);
            uni_subject_reputation_local_rank_list.push(uni_subject_reputation_local_rank);

            return {uni_details_list, uni_subject_rank_list, uni_subject_reputation_global_rank_list, uni_subject_reputation_local_rank_list};
          })
          .catch(err => console.error(err)))
      }catch(err) {
        console.log(err);
      }
    }

    
      return {uni_details_list, uni_subject_rank_list, uni_subject_reputation_global_rank_list, uni_subject_reputation_local_rank_list};
    
  }catch(err) {
    console.log(err);
    return Promise.reject(err);
  }
}


async function scrap_usnews_rankings(){
  const uni_list = await getUniList();
  const uni_list_file_name = 'uni_list.csv'  
  let csvWriter = createCsvWriter({
    path: uni_list_file_name,
    header: uni_list_header
  });
  
  
  csvWriter
  .writeRecords(uni_list)
  .then(()=> console.log(uni_list_file_name + ' was written successfully'));

  const {uni_details_list, uni_subject_rank_list, uni_subject_reputation_global_rank_list, uni_subject_reputation_local_rank_list} = await getUniDetailsList(uni_list);
  // write uni_details_list file 
  const uni_list_details_file_name = 'uni_details_list.csv'  
  csvWriter = createCsvWriter({
    path: uni_list_details_file_name,
    header: uni_details_header
  });
  csvWriter
  .writeRecords(uni_details_list)
  .then(()=> console.log(uni_list_details_file_name + ' was written successfully'));

  // write uni_subject_rank_list file
  const uni_subject_rank_list_file_name = 'uni_subject_rank_list.csv'  
  csvWriter = createCsvWriter({
    path: uni_subject_rank_list_file_name,
    header: uni_subject_rank_header
  });
  csvWriter
  .writeRecords(uni_subject_rank_list)
  .then(()=> console.log(uni_subject_rank_list_file_name + ' was written successfully'));

  // write uni_subject_reputation_global_rank file
  const uni_subject_reputation_global_rank_file_name = 'uni_subject_reputation_global_rank_list.csv'
  csvWriter = createCsvWriter({
    path: uni_subject_reputation_global_rank_file_name,
    header: uni_subject_rank_header
  });
  csvWriter
  .writeRecords(uni_subject_reputation_global_rank_list)
  .then(()=> console.log(uni_subject_reputation_global_rank_file_name + ' was written successfully'));  
  
  
  // write uni_subject_reputation_local_rank_list file
  const uni_subject_reputation_local_rank_list_file_name = 'uni_subject_reputation_local_rank_list.csv'
  csvWriter = createCsvWriter({
    path: uni_subject_reputation_local_rank_list_file_name,
    header: uni_subject_rank_header
  });    
  csvWriter
  .writeRecords(uni_subject_reputation_local_rank_list)
  .then(()=> console.log(uni_subject_reputation_local_rank_list_file_name + ' was written successfully'));

  return uni_details_list;
}

const uni_list = scrap_usnews_rankings();