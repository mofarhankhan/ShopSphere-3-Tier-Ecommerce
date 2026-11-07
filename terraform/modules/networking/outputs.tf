output "private_subnet_ids" {
  description = "IDs of created private subnets"
  value       = aws_subnet.private[*].id
}

output "private_route_table_id" {
  description = "Private route table ID"
  value       = aws_route_table.private.id
}

output "private_subnet_cidrs" {
  description = "Private subnet CIDR blocks"
  value       = aws_subnet.private[*].cidr_block
}
