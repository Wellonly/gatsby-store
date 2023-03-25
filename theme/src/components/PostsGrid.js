import {Grid} from "@material-ui/core";
import path from "path";
import Card from "./Card";
import React from "react";

export default ({ posts, pathPrefix }) => {
    return (
        <Grid container spacing={3}>
            {posts.map(
                ({
                     node: {
                         excerpt,
                         fileAbsolutePath,
                         frontmatter: { id, title, featuredImage }
                     }
                 }) => {
                    const postDate = path
                        .basename(fileAbsolutePath)
                        .split("-")
                        .splice(0, 3)
                        .join("-");
                    return (
                        <Grid item xs={12} sm={4} key={id}>
                            <Card
                                featuredImage={featuredImage}
                                title={title}
                                url={`/${pathPrefix}/${id}`}
                                postDate={postDate}
                                excerpt={excerpt}
                            />
                        </Grid>
                    );
                }
            )}
        </Grid>
    );
};
