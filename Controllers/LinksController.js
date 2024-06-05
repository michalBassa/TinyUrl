import linkModel from "../Models/linkModel.js";
import userModel from "../Models/userModel.js";


const baseUrl = 'https://tinyurl.co.il'; // URL הבסיסי של השירות

const LinksController={
    getList : async (req, res) => {
        try {
          const links = await linkModel.find();
          res.status(200).json(links);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
    },
    
      redirectLink:async(req,res)=>{
        const {id}=req.params;
        
        try{
            const link =await linkModel.findById(id);
        
        if(!link){
            res.status(404).send('Link Not Found');
        }
        const targetParamValue =req.query[link.targetParamName]||"";

        const clickData = {
            insertedAt: Date.now(),
            ipAddress: req.ip,
            targetParamValue: targetParamValue
        };
          link.clicks.push(clickData)
          await link.save();
         res.redirect(link.originalUrl)
       }catch(error){
        res.status(400).json({ message: error.message });
       }
      },
      
  add: async (req, res) => {
    const { originalUrl,targetParamName,targetValues,userId } = req.body;
    try {
      const newLink = await linkModel.create({ originalUrl,targetParamName,targetValues });
      const user=await userModel.findById(userId);
      user.links.push(newLink)
      await user.save();
      res.status(201).json({ message: 'Link created successfully',});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
      update : async (req, res) => {
       const {id}=req.params;
       const {originalUrl}=req.body;
        try {
          const updatedLink = await linkModel.findByIdAndUpdate({id}, {originalUrl}, { new: true });
          if (!updatedLink) {
            return res.status(404).json({ success: false, message: "Link not found" });
        }
        res.status(200).json(updatedLink);

        }catch (error) {
            res.status(400).json({ message: error.message });
          }
         
        },
        delete : async(req,res)=>{
            const { id } = req.params;
            try{
                const deleted=await linkModel.findByIdAndDelete(id)
                res.json(deleted);
            } catch (error) {
              res.status(400).json({ message: error.message });
            }
        },getClickStatistics: async (req, res) => {
            const { id } = req.params;
            try {
                const link = await linkModel.findById(id);
                if (!link) {
                    return res.status(404).send('Link not found');
                }
        
                const clickStatistics = link.clicks.reduce((acc, click) => {
                    const source = click.targetParamValue;
                    const targetValues = link.targetValues.find(item => item.name === source);
                    const sourceName = targetValues ? targetValues.value : source;
                    if (!acc[sourceName]) {
                        acc[sourceName] = 0;
                    }
                    acc[sourceName]++;
                   return acc;
                }, {});
        
                res.status(200).json(clickStatistics);
            } catch (error) {
                res.status(500).json('Internal Server Error');
            }
        }
        
};
export default LinksController;

 