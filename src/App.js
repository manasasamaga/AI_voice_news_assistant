import React,{useState,useEffect} from 'react'
import wordsToNumbers from 'words-to-numbers'


import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/NewsCards/NewsCards'
const alanKey='e2b449de1ecd530e39a714ebcb159b582e956eca572e1d8b807a3e2338fdd0dc/stage'
const App=()=>{
    const [newsArticles,setNewsArticles]=useState([]);
    const [activeArticle,setActiveArticle]=useState(-1);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(()=>{
        alanBtn({
            key:alanKey,
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadlines') {
                  setNewsArticles(articles);
                  setActiveArticle(-1);
                } else if (command === 'instructions') {
                  setIsOpen(true);
                } else if (command === 'highlight') {
                  setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if (command === 'open') {
                  const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                  const article = articles[parsedNumber - 1];
        
                  if (parsedNumber > articles.length) {
                    alanBtn().playText('Please try that again...');
                  } else if (article) {
                    window.open(article.url, '_blank');
                    alanBtn().playText('Opening...');
                  } else {
                    alanBtn().playText('Please try that again...');
                  }
                }
              },
            });
          }, []);
        
    return(
        <div>
        
            <div style={{color:"white",display: "flex",justifyContent: "center",alignItems: "center" ,fontFamily: "sans-serif"}}>
            <h1>NEWS ASSISTANT</h1>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    )
}
export default App
