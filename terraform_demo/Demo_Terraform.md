
# Récupérer les clés d'accès puis les setter en variables d'environnement
- Si besoin, voir [la console](https://us-east-console.aws.amazon.com/iamv2/home#/security_credentials/access-key-wizard)  pour récupérer les clés d'API.

- Setter les variables d'environnement pour accéder à l'AWS avec le client en ligne de commandes
	```console
	export AWS_ACCESS_KEY_ID="AXSS....Z7"
	export AWS_SECRET_ACCESS_KEY="N....X"
	```

- Vérifier que rien ne tourne avant la démo sur [la console](https://eu-central-1.console.aws.amazon.com/ec2/home?region=eu-central-1#Instances:instanceState=running)

# Contenu d'un fichier terraform simple

La démonstration va utiliser simplement 2 fichiers  :
```console
ls
main.tf  variables.tf
```
```main.tf``` est le fichier principal, ```variables.tf``` permet la déclaration de variables, que l'on utilisera en fin de démonstration.

```console
cat main.tf 
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "eu-central-1"
}

resource "aws_instance" "app_server" {
  ami           = "ami-0ec7f9846da6b0f61"
  instance_type = "t2.micro"

  tags = {
    Name = var.instance_name
  }
}
```

Elements principaux : 
- terraform : Contient les informations liés à la version de Terraform et les providers utilisés
- provider 'aws' : Le paramétrage du provider Amazon
- resource "aws_instance" "app_server" : Décrit une instance de serveur à créer dans AWS, tel que l'image de VM à utiliser et les ressources à lui alloue


On initialise l'état de Terraform
```console
terraform init


Initializing the backend...

Initializing provider plugins...
- Finding hashicorp/aws versions matching "~> 4.16"...
- Installing hashicorp/aws v4.67.0...
- Installed hashicorp/aws v4.67.0 (signed by HashiCorp)

Terraform has created a lock file .terraform.lock.hcl to record the provider
selections it made above. Include this file in your version control repository
so that Terraform can guarantee to make the same selections by default when
you run "terraform init" in the future.

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
```

On voit qu'il a créé des fichiers cachés pour suivre l'état des déploiements : 

```console
ls -a
.terraform  .terraform.lock.hcl  main.tf  variables.tf
```

# Appliquer l'action Terraform

On vérifie d'abord que le fichier d'action est cohérent et que Terraform pourra bien exécuter les actions souhaitées : 

```console
terraform plan

Terraform used the selected providers to generate the following execution plan. Resource actions are
indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # aws_instance.app_server will be created
  + resource "aws_instance" "app_server" {
      + ami                                  = "ami-0ec7f9846da6b0f61"
      + arn                                  = (known after apply)
      + associate_public_ip_address          = (known after apply)
      + availability_zone                    = (known after apply)
      + cpu_core_count                       = (known after apply)
      + cpu_threads_per_core                 = (known after apply)
      + disable_api_stop                     = (known after apply)
      + disable_api_termination              = (known after apply)
      + ebs_optimized                        = (known after apply)
      + get_password_data                    = false
      + host_id                              = (known after apply)
      + host_resource_group_arn              = (known after apply)
      + iam_instance_profile                 = (known after apply)
      + id                                   = (known after apply)
      + instance_initiated_shutdown_behavior = (known after apply)
      + instance_state                       = (known after apply)
      + instance_type                        = "t2.micro"
      + ipv6_address_count                   = (known after apply)
      + ipv6_addresses                       = (known after apply)
      + key_name                             = (known after apply)
      + monitoring                           = (known after apply)
      + outpost_arn                          = (known after apply)
      + password_data                        = (known after apply)
      + placement_group                      = (known after apply)
      + placement_partition_number           = (known after apply)
      + primary_network_interface_id         = (known after apply)
      + private_dns                          = (known after apply)
      + private_ip                           = (known after apply)
      + public_dns                           = (known after apply)
      + public_ip                            = (known after apply)
      + secondary_private_ips                = (known after apply)
      + security_groups                      = (known after apply)
      + source_dest_check                    = true
      + subnet_id                            = (known after apply)
      + tags                                 = {
          + "Name" = "ExampleAppServerInstance"
        }
      + tags_all                             = {
          + "Name" = "ExampleAppServerInstance"
        }
      + tenancy                              = (known after apply)
      + user_data                            = (known after apply)
      + user_data_base64                     = (known after apply)
      + user_data_replace_on_change          = false
      + vpc_security_group_ids               = (known after apply)
    }

Plan: 1 to add, 0 to change, 0 to destroy.

─────────────────────────────────────────────────────────────────────────────────────────────────────

Note: You didn't use the -out option to save this plan, so Terraform can't guarantee to take exactly
these actions if you run "terraform apply" now.
```

Aucune erreur n'est affichée, on peut donc lancer la création :

```console
terraform apply

Terraform used the selected providers to generate the following execution plan. Resource actions are
indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # aws_instance.app_server will be created
  + resource "aws_instance" "app_server" {
      + ami                                  = "ami-0ec7f9846da6b0f61"
      + arn                                  = (known after apply)
      + associate_public_ip_address          = (known after apply)
      + availability_zone                    = (known after apply)
      + cpu_core_count                       = (known after apply)
      + cpu_threads_per_core                 = (known after apply)
      + disable_api_stop                     = (known after apply)
      + disable_api_termination              = (known after apply)
      + ebs_optimized                        = (known after apply)
      + get_password_data                    = false
      + host_id                              = (known after apply)
      + host_resource_group_arn              = (known after apply)
      + iam_instance_profile                 = (known after apply)
      + id                                   = (known after apply)
      + instance_initiated_shutdown_behavior = (known after apply)
      + instance_state                       = (known after apply)
      + instance_type                        = "t2.micro"
      + ipv6_address_count                   = (known after apply)
      + ipv6_addresses                       = (known after apply)
      + key_name                             = (known after apply)
      + monitoring                           = (known after apply)
      + outpost_arn                          = (known after apply)
      + password_data                        = (known after apply)
      + placement_group                      = (known after apply)
      + placement_partition_number           = (known after apply)
      + primary_network_interface_id         = (known after apply)
      + private_dns                          = (known after apply)
      + private_ip                           = (known after apply)
      + public_dns                           = (known after apply)
      + public_ip                            = (known after apply)
      + secondary_private_ips                = (known after apply)
      + security_groups                      = (known after apply)
      + source_dest_check                    = true
      + subnet_id                            = (known after apply)
      + tags                                 = {
          + "Name" = "ExampleAppServerInstance"
        }
      + tags_all                             = {
          + "Name" = "ExampleAppServerInstance"
        }
      + tenancy                              = (known after apply)
      + user_data                            = (known after apply)
      + user_data_base64                     = (known after apply)
      + user_data_replace_on_change          = false
      + vpc_security_group_ids               = (known after apply)
    }

Plan: 1 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

aws_instance.app_server: Creating...
aws_instance.app_server: Still creating... [10s elapsed]
aws_instance.app_server: Still creating... [20s elapsed]
aws_instance.app_server: Still creating... [30s elapsed]
aws_instance.app_server: Creation complete after 32s [id=i-059c8fdfa4bca96d9]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

L'application du fichier s'est faite sans erreur, Terraform indique qu'il a bien créé une ressource.





# Voir ce qui a été créé 

Si on demande à Terraform d'afficher son état, il affiche le serveur instancié : 

```console
terraform show

# aws_instance.app_server:
resource "aws_instance" "app_server" {
    ami                                  = "ami-0ec7f9846da6b0f61"
    arn                                  = "arn:aws:ec2:eu-central-1:298787190371:instance/i-059c8fdfa4bca96d9"
    associate_public_ip_address          = true
    availability_zone                    = "eu-central-1a"
    cpu_core_count                       = 1
    cpu_threads_per_core                 = 1
    disable_api_stop                     = false
    disable_api_termination              = false
    ebs_optimized                        = false
    get_password_data                    = false
    hibernation                          = false
    id                                   = "i-059c8fdfa4bca96d9"
    instance_initiated_shutdown_behavior = "stop"
    instance_state                       = "running"
    instance_type                        = "t2.micro"
    ipv6_address_count                   = 0
    ipv6_addresses                       = []
    monitoring                           = false
    placement_partition_number           = 0
    primary_network_interface_id         = "eni-02d781172343c3101"
    private_dns                          = "ip-172-31-31-162.eu-central-1.compute.internal"
    private_ip                           = "172.31.31.162"
    public_dns                           = "ec2-3-127-218-132.eu-central-1.compute.amazonaws.com"
    public_ip                            = "3.127.218.132"
    secondary_private_ips                = []
    security_groups                      = [
        "default",
    ]
    source_dest_check                    = true
    subnet_id                            = "subnet-093e4b1032009ca7d"
    tags                                 = {
        "Name" = "ExampleAppServerInstance"
    }
    tags_all                             = {
        "Name" = "ExampleAppServerInstance"
    }
    tenancy                              = "default"
    user_data_replace_on_change          = false
    vpc_security_group_ids               = [
        "sg-04413af310e660ef6",
    ]

    capacity_reservation_specification {
        capacity_reservation_preference = "open"
    }

    cpu_options {
        core_count       = 1
        threads_per_core = 1
    }

    credit_specification {
        cpu_credits = "standard"
    }

    enclave_options {
        enabled = false
    }

    maintenance_options {
        auto_recovery = "default"
    }

    metadata_options {
        http_endpoint               = "enabled"
        http_put_response_hop_limit = 1
        http_tokens                 = "optional"
        instance_metadata_tags      = "disabled"
    }

    private_dns_name_options {
        enable_resource_name_dns_a_record    = false
        enable_resource_name_dns_aaaa_record = false
        hostname_type                        = "ip-name"
    }

    root_block_device {
        delete_on_termination = true
        device_name           = "/dev/sda1"
        encrypted             = false
        iops                  = 100
        tags                  = {}
        throughput            = 0
        volume_id             = "vol-0fe81a39074091f29"
        volume_size           = 8
        volume_type           = "gp2"
    }
}
```

# Vérifier que l'instance est créée sur Amazon :

On peut se rendre sur la [console Web Amazon](https://eu-central-1.console.aws.amazon.com/ec2/home?region=eu-central-1#Instances:instanceState=running) pour vérifier que l'instance est aussi visible dessus.


# Appliquer à nouveau pour voir que rien ne change

Terraform gère le différentiel entre l'état cible et l'actuel. Si on demande à appliquer exactement le même fichier, il va déterminer qu'il n'y a rien à faire : 

```console
terraform apply

aws_instance.app_server: Refreshing state... [id=i-059c8fdfa4bca96d9]

No changes. Your infrastructure matches the configuration.

Terraform has compared your real infrastructure against your configuration and found no differences,
so no changes are needed.

Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
```

# Modifier l'ami de la VM, pour en déployer un autre type : 

Si on modifie le fichier ```main.tf``` et que l'on change l'identifiant de l'image de la VM, cette fois Terraform voit qu'il y a une modification à appliquer.

- Ancien ami (AMI Amazon Linux 2023) : ami-03aefa83246f44ef2
- Nouvel ami à mettre (Ubuntu Server 22.04 LTS) : ami-0ec7f9846da6b0f61
- Page de catalogue des ami : https://eu-central-1.console.aws.amazon.com/ec2/home?region=eu-central-1#AMICatalog:


# Supprimer l'instance via terraform


Pour nettoyer l'environnement, on se base sur le même fichier ```main.tf``` qu'à la mise en place. Terraform va gérer la destruction de toutes les ressources qui s'y trouvent.

```console
terraform destroy

aws_instance.app_server: Refreshing state... [id=i-059c8fdfa4bca96d9]

Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following
symbols:
  - destroy

Terraform will perform the following actions:

  # aws_instance.app_server will be destroyed
  - resource "aws_instance" "app_server" {
      - ami                                  = "ami-0ec7f9846da6b0f61" -> null
      - arn                                  = "arn:aws:ec2:eu-central-1:298787190371:instance/i-059c8fdfa4bca96d9" -> null
      - associate_public_ip_address          = true -> null
      - availability_zone                    = "eu-central-1a" -> null
      - cpu_core_count                       = 1 -> null
      - cpu_threads_per_core                 = 1 -> null
      - disable_api_stop                     = false -> null
      - disable_api_termination              = false -> null
      - ebs_optimized                        = false -> null
      - get_password_data                    = false -> null
      - hibernation                          = false -> null
      - id                                   = "i-059c8fdfa4bca96d9" -> null
      - instance_initiated_shutdown_behavior = "stop" -> null
      - instance_state                       = "running" -> null
      - instance_type                        = "t2.micro" -> null
      - ipv6_address_count                   = 0 -> null
      - ipv6_addresses                       = [] -> null
      - monitoring                           = false -> null
      - placement_partition_number           = 0 -> null
      - primary_network_interface_id         = "eni-02d781172343c3101" -> null
      - private_dns                          = "ip-172-31-31-162.eu-central-1.compute.internal" -> null
      - private_ip                           = "172.31.31.162" -> null
      - public_dns                           = "ec2-3-127-218-132.eu-central-1.compute.amazonaws.com" -> null
      - public_ip                            = "3.127.218.132" -> null
      - secondary_private_ips                = [] -> null
      - security_groups                      = [
          - "default",
        ] -> null
      - source_dest_check                    = true -> null
      - subnet_id                            = "subnet-093e4b1032009ca7d" -> null
      - tags                                 = {
          - "Name" = "ExampleAppServerInstance"
        } -> null
      - tags_all                             = {
          - "Name" = "ExampleAppServerInstance"
        } -> null
      - tenancy                              = "default" -> null
      - user_data_replace_on_change          = false -> null
      - vpc_security_group_ids               = [
          - "sg-04413af310e660ef6",
        ] -> null

      - capacity_reservation_specification {
          - capacity_reservation_preference = "open" -> null
        }

      - cpu_options {
          - core_count       = 1 -> null
          - threads_per_core = 1 -> null
        }

      - credit_specification {
          - cpu_credits = "standard" -> null
        }

      - enclave_options {
          - enabled = false -> null
        }

      - maintenance_options {
          - auto_recovery = "default" -> null
        }

      - metadata_options {
          - http_endpoint               = "enabled" -> null
          - http_put_response_hop_limit = 1 -> null
          - http_tokens                 = "optional" -> null
          - instance_metadata_tags      = "disabled" -> null
        }

      - private_dns_name_options {
          - enable_resource_name_dns_a_record    = false -> null
          - enable_resource_name_dns_aaaa_record = false -> null
          - hostname_type                        = "ip-name" -> null
        }

      - root_block_device {
          - delete_on_termination = true -> null
          - device_name           = "/dev/sda1" -> null
          - encrypted             = false -> null
          - iops                  = 100 -> null
          - tags                  = {} -> null
          - throughput            = 0 -> null
          - volume_id             = "vol-0fe81a39074091f29" -> null
          - volume_size           = 8 -> null
          - volume_type           = "gp2" -> null
        }
    }

Plan: 0 to add, 0 to change, 1 to destroy.

Do you really want to destroy all resources?
  Terraform will destroy all your managed infrastructure, as shown above.
  There is no undo. Only 'yes' will be accepted to confirm.

  Enter a value: yes

aws_instance.app_server: Destroying... [id=i-059c8fdfa4bca96d9]
aws_instance.app_server: Still destroying... [id=i-059c8fdfa4bca96d9, 10s elapsed]
aws_instance.app_server: Still destroying... [id=i-059c8fdfa4bca96d9, 20s elapsed]
aws_instance.app_server: Destruction complete after 30s

Destroy complete! Resources: 1 destroyed.
```

# Vérifier que l'instance n'est plus là via le client

Comme précédemment, on vérifie l'état du système après avoir appliqué les modifications :

```console
terraform show

The state file is empty. No resources are represented.
```

Terraform indique qu'il n'y a aucune ressource présente, le nettoyage a donc bien été effectué.

# Vérifier que l'instance n'est plus là dans amazon 

On peut vérifier via la [console Web AWS](https://eu-central-1.console.aws.amazon.com/ec2/home?region=eu-central-1#Instances:instanceState=running) que le nettoyage a bien été fait.


# Utilisation d'une variable : Surcharge de la valeur par défaut du nom de l'instance

Terraform supporte l'utilisation de variables. Pour cela, on les déclare dans un fichier ```variables.tf``` : 

```console
cat variables.tf

variable "instance_name" {
  description = "Valeur du Name tag pour l'instance EC2"
  type        = string
  default     = "ExampleAppServerInstance"
}
```
On voit que la variable a pour valeur par défaut ```ExampleAppServerInstance```.

Pour rappel, cette variable est utilisée dans le fichier ```main.tf``` :
```
resource "aws_instance" "app_server" {
  [...]
  tags = {
    Name = var.instance_name
  }
}
```

Pour surcharger la valeur par défaut de la variable, on utilise l'option ```-var``` dans la ligne de commande : 
```console
terraform apply -var "instance_name=UnNouveauNomPourMonTag"
```

Une fois la commande exécutée, on vérifie que la valeur surchargée a été utilisée : 
```console
terraform show | grep UnNouveauNomPourMonTag

        "Name" = "UnNouveauNomPourMonTag"
```

On retrouve bien la valeur surchargée, on a bien appliqué la modification.
